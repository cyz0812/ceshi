<?php
/*
 * 入金管理模块
 * 获取、读取、转到记录
 * add by liang 2017-08-14
 */
namespace app\xinguanjia\controller;
use app\base\controller\Base;
use app\xinguanjia\model\Capital as CapitalModel;
use app\info\model\Record;
use think\Session;
class Deposit extends Base {
	
	/*
	 * 入金页面
	 * 信管家：$deposit_x，网站：$deposit_w
	 */
	public function yt_deposit(){
		$deposit_x = CapitalModel::capital_a('deposit');
		$this->assign('deposit_x',$deposit_x);
        $deposit_w = CapitalModel::capital_d('deposit');
		$this->assign('deposit_w',$deposit_w);
        $deposit_z = CapitalModel::capital_s('deposit');
        $this->assign('deposit_z',$deposit_z);
		return $this->fetch();
	}
	
	/*
	 * 入金详情页面
	 */
	public function detail_deposit(){
		$capital    = Db('capital');
		$user       = Db('user');
		$xgjuser       = Db('xinguanjia');
		$record     = Db('record');
		$invitelist = Db('invitelist');
		if(input('id')){
			$deposit     = CapitalModel::get(input('id'));
			$fee         = number_format($deposit['amount']*3/1000,2);
			$real_amount = number_format($deposit['amount']-$fee,2);
			$zfb_num     = $deposit['nickname'];
            $account_info=Db('xinguanjia')->where('account',$deposit['account'])->find();
            if(empty($account_info['invite_phone'])){
                $account=substr($deposit['account'],0,3);
                $agent=Db('agent')->where('del',0)->where('account_front',$account)->find();
                $user=$agent['phone'];
            }else{
                $user=$account_info['invite_phone'];
            }
            $account_user = $xgjuser->where('account',$deposit['account'])->find();
            $this->assign('a',$user);
			$this->assign('deposit',$deposit);
            $this->assign('fee',$fee);
			$this->assign('real_amount',$real_amount);
			$this->assign('zfb_num',$zfb_num);
            $this->assign('user',$account_user);
			return $this->fetch();
		}else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	}
	
	/*
	 * 入金处理函数
	 * 成功：state=1；失败state=2；
	 */
	public function reply_deposit(){
		$capital = Db('capital');
		$time    = date("Y-m-d H:i:s",time());
		if(!empty(input('id'))){
            $deposit =Db('capital')->where('id',input('id'))->find();
            $user=Db('xinguanjia')->where('account', $deposit['account'])->find();
            $a=Db('user')->where('phone','like',"%{$user['phone']}")->find();
            $this->assign('kehu_phone',$a);
            $this->assign('user',$user);
            $this->assign('withdraw',$deposit);

			echo $this->fetch();
//		}elseif(!empty(input('success'))){
//            $data['state']     = 1;
//            $data['replytime'] = $time;
//            $row=$capital->where('id',input('success'))->update($data);
//            if(!!$row){
//                $a=$capital->where('id',input('success'))->find();
//                if($a['capital_type']=='1'){
//                    $account= substr($a['account'] ,3);
//                    $capital_account=Db('agent')->where('account_front',$account)->select();
//                    foreach ( $capital_account as $value){
//                        $url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/deposit_xgjsuccess.php';
//                        $data_val['phone']      = $value['phone'];
//                        $data_val['account']   	= $a['account'];
//                        $data_val['money']   	= $a['amount'];
//                        php_post($url, $data_val);
//                    }
//                }else{
//                    $url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/deposit_success.php';
//                    $data_val['phone']      = $_POST['phone'];
//                    $data_val['account']   	= $a['account'];
//                    $data_val['money']   	= $a['amount'];
//                    php_post($url, $data_val);
//                }
//                $map['out_orderid']=$a['out_orderid'];
//                $map['method']='deposit';
//                $map['belong']=$a['belong'];
//                $map['type']=$a['type_kind'];
//                $map['account']=  $a['account'] ;
//                $map['amount']=  $a['amount'] ;
//                $map['subject']=  $a['type'] ;
//                $map['body']=  $a['userid'] ;
//                $map['trans_time']= $time ;
//                $map['invite']= $a['invite'] ;
//                $map['state']= '充值成功' ;
//                Db('record')->insert($map);
//                getAlert('处理成功','/xinguanjia/deposit/yt_deposit');
//
//            }else{
//                getAlert('回复数据更新失败，请联系相关技术人员！','/xinguanjia/deposit/yt_deposit');
//            }
        }
        else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	}
	
	/*
	 * 入金记录
	 * 时间区间+条件查询
	 */
	public function record_deposit(){
		$capital = Db('capital');
		$input   = input('');
		if(!empty($input['start_date'])){
    		$map['replytime'] = ['between time',array($input['start_date'],$input['end_date'])];
    	}else{
    		$map['replytime'] = ['> time',date('Y-m-d H:i:s',strtotime('-1 day'))];
    		$this->assign('start_date',date('Y-m-d H:i:s',strtotime('-1 day')));
    		$this->assign('end_date',date('Y-m-d H:i:s',time()));
    	}

    	if(!empty($input['capital_type']) && $input['capital_type']===0){
    		$map['capital_type'] = $input['capital_type'];
    	}else if(!empty($input['capital_type']) && $input['capital_type']!=-1){
    		$map['capital_type'] = $input['capital_type'];

    	}
        if(!empty($input['type_kind']) && $input['type_kind']==='aqihuo'){
            $map['type_kind'] = $input['type_kind'];
        }else if(!empty($input['type_kind']) && $input['type_kind']!=-1){
            $map['type_kind'] = $input['type_kind'];
        }
    	if(!empty($input['condition']) && !empty($input['value'])){
    		if($input['condition']=='state' && $input['value']=='处理中'){
    			$input['value'] = 0;
    		}
    		elseif($input['condition']=='state' && $input['value']=='成功'){
    			$input['value'] = 1;
    		}
    		elseif($input['condition']=='state' && $input['value']=='失败'){
    			$input['value'] = 2;
    		}
    		if($input['condition']=='amount'){
    			$map[$input['condition']] = $input['value'];
    		}elseif($input['condition']=='out_orderid'){
    			$map[$input['condition']] = array('like','%'.$input['value']);
    		}else{
    			$map[$input['condition']] = array('like',$input['value'].'%');
    		}

    	}

		$map['method'] = array('in','deposit,1');
		$deposit = CapitalModel::where($map)->order('replytime desc')->paginate(30,false,['query' => input('param.')]);
        $page    = $deposit->render();
		$this->assign('deposit',$deposit);
		$this->assign('page',$page);
		return $this->fetch();
	}
	
	/*
	 * 入金记录详情
	 */
	public function detail_record_deposit(){
		$user       = Db('user');
		$xgjuser    = Db('xinguanjia');
		$invitelist = Db('invitelist');
		if(input('id')){
			$deposit     = CapitalModel::get(input('id'));
			$fee         = number_format($deposit['amount']*3/1000,2);
			$real_amount = number_format($deposit['amount']-$fee,2);
			$zfb_num     = $deposit['nickname'];
			$account_userinfo=Db('xinguanjia')->where('account',$deposit['account'])->find();
			$this->assign('userinfo',$account_userinfo);
		    if(empty($account_userinfo['invite_phone'])){
                $account=substr($deposit['account'],0,3);
                $agent=Db('agent')->where('del',0)->where('account_front',$account)->find();
                $user=$agent['phone'];
            }else{
                $user=$account_userinfo['invite_phone'];
            }

		    $this->assign('user',$user);
			$this->assign('deposit',$deposit);
			$this->assign('fee',$fee);
			$this->assign('real_amount',$real_amount);
			$this->assign('zfb_num',$zfb_num);
			return $this->fetch();
		}else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	
	}
	public function deposit_success(){
        $time    = date("Y-m-d H:i:s",time());
        $message=Db('message');
        $arr['flag']=0;
   if(!empty(input('success'))) {

       $data['state'] = 1;
       $data['replytime'] = $time;
       $row = Db('capital')->where('id', input('success'))->update($data);
       if (!!$row) {
           $arr['flag']=1;
           $a=Db('capital')->where('id',input('success'))->find();
           $map['out_orderid']=$a['out_orderid'];
           $map['method']='deposit';
           $map['belong']=$a['belong'];
           $map['type']=$a['type_kind'];
           $map['account']=  $a['account'] ;
           $map['amount']=  $a['amount'] ;
           $map['subject']=  $a['type'] ;
           $map['body']=  $a['userid'] ;
           $map['trans_time']= $time ;
           $map['invite']= $a['invite'] ;
           $map['state']= '充值成功' ;
           Db('record')->insert($map);
           if ($_POST['invite_phone']!='') {
               $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/deposit_success.php';
               $data_val['phone'] = $_POST['invite_phone'];
               $data_val['account'] = $_POST['account'];
               $data_val['money'] = $_POST['amount'];
               php_post($url, $data_val);

           }
           if ($_POST['phone']!='') {
               $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/deposit_success.php';
               $data_val['phone'] = $_POST['phone'];
               $data_val['account'] = $_POST['account'];
               $data_val['money'] = $_POST['amount'];
               php_post($url, $data_val);

           }
           $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/deposit_success.php';
           $data_val['phone'] = '18206068975';
           $data_val['account'] = $_POST['account'];
           $data_val['money'] = $_POST['amount'];
           php_post($url, $data_val);

           $arr['flag'] = 1;
       }
       return json($arr);
   }
    }

	public function deposit_error(){


            $row=Db('capital')->where('id',input('id'))->update(['state'=>2]);
            if($row !== false){
                $arr['flag']=1;
                $time    = date("Y-m-d H:i:s",time());
                $a=Db('capital')->where('id',input('id'))->find();
                $map['out_orderid']=$a['out_orderid'];
                $map['method']='deposit';
                $map['belong']=$a['belong'];
                $map['type']=$a['type_kind'];
                $map['account']=  $a['account'] ;
                $map['amount']=  $a['amount'] ;
                $map['subject']=  $a['type'] ;
                $map['body']=  $a['userid'] ;
                $map['trans_time']= $time ;
                $map['invite']= $a['invite'] ;
                $map['state']= '充值失败' ;
                Db('record')->insert($map);


                if ($_POST['invite_phone']!='') {
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/deposit_error.php';
                    $data_val['phone'] = $_POST['invite_phone'];
                    $data_val['account'] = $_POST['account'];
                    $data_val['money'] = $_POST['amount'];
                    $data_val['text'] = $_POST['text'];
                    php_post($url, $data_val);

                }
                if ($_POST['phone']!='') {
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/deposit_error.php';
                    $data_val['phone'] = $_POST['phone'];
                    $data_val['account'] = $_POST['account'];
                    $data_val['money'] = $_POST['amount'];
                    $data_val['text'] = $_POST['text'];
                    php_post($url, $data_val);

                }
              

                return json($arr);
        }

    }
}