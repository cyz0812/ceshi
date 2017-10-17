<?php
/*
 * 出金管理模块
 * 获取、读取、转到记录
 * add by liang 2017-08-14
 */
namespace app\xinguanjia\controller;
use app\base\controller\Base;
use app\xinguanjia\model\Capital as CapitalModel;
use app\info\model\Record;
use think\Session;
class Withdraw extends Base {
	
	/*
	 * 出金页面
	 * 信管家：$deposit_x，网站：$deposit_w
	 */
	public function yt_withdraw(){
        $withdraw_a = CapitalModel::capital_a('withdraw');
        $this->assign('withdraw_a',$withdraw_a);
        $withdraw_d = CapitalModel::capital_d('withdraw');
        $this->assign('withdraw_d',$withdraw_d);
        $withdraw_s = CapitalModel::capital_s('withdraw');
        $this->assign('withdraw_s',$withdraw_s);
        return $this->fetch();
	}
	
	/*
	 * 出金详情页面
	 */
	public function detail_withdraw(){
    	$agent = Db('agent');
    	$user       = Db('user');
    	$xgjuser    = Db('xinguanjia');
    	if(input('id')){
    		$withdraw = CapitalModel::get(input('id'));
    		if($withdraw['amount']==0){
    			$real_amount ='全部-2';
    		}else{
    			$real_amount = number_format($withdraw['amount']-2,2);
    		}
    		if($withdraw['type_kind']=='aqihuo'){
    			$this->assign('type_kind','国际期货');
    		}elseif($withdraw['type_kind']=='dqihuo'){
    			$this->assign('type_kind','国内期货');
    		}elseif($withdraw['type_kind']=='shares'){
    			$this->assign('type_kind','股票');
    		}
            $account_info=Db('xinguanjia')->where('account',$withdraw['account'])->find();
            if(empty($account_info['invite_phone'])){
                $account=substr($withdraw['account'],0,3);
                $agent=Db('agent')->where('account_front',$account)->find();
                $user=$agent['phone'];
            }else{
                $user=$account_info['invite_phone'];
            }
            if($withdraw['capital_type']==1){
                $mo=$withdraw;

            }else{
              if($withdraw['type_kind']=='aqihuo'){
               $a= Db('user')->where('a_account',$withdraw['account'])->find();
                  $mo=$a;
              }
              elseif($withdraw['type_kind']=='dqihuo'){
                  $a= Db('user')->where('d_account',$withdraw['account'])->find();
                  $mo=$a;
              }
            }
            $this->assign('account_info',$user);
            $this->assign('mo',$mo);
    		$this->assign('user',$account_info);
    		$this->assign('real_amount',$real_amount);
    		$this->assign('withdraw',$withdraw);

    		return $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
    
    /*
     * 出金处理函数
     * 成功：state=1；失败state=2；
     */
    public function reply_withdraw(){
    	$capital = Db('capital');
    	$time    = date("Y-m-d H:i:s",time());
    	$input   = input('');

    	if(!empty($input['id'])){
    		$withdraw = CapitalModel::get($input['id']);
            $this->assign('withdraw',$withdraw);

            $user=Db('xinguanjia')->where('account',$withdraw['account'])->find();
            $this->assign('user',$user);
    		return $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
	}
	public function withdraw_success(){
		$message=Db('message');
		$arr['flag']=0;
		if($_POST['out_orderid']){
			$record_data['state']      = '出金成功';
			$record_data['notifytime'] = date("Y-m-d H:i:s",time());
			$row = Record::getsave(['out_orderid' => $_POST['out_orderid']],$record_data);

			if($row !== false){
				$arr['flag']=1;
                if($_POST['amount']=='全部'){
                    $real_amount ='全部-2';
                }else{
                    $real_amount = number_format($_POST['amount']-2,2);
                }
				$message_data['userid']  = $_POST['userid'];
				$message_data['type']    = 2;
				$message_data['state']   = 0;
				$message_data['title']   = '您的出金申请已成功';
				$message_data['content'] = '尊敬的客户，您申请的出金'.$_POST['amount'].'已成功，最迟2小时到账，请耐心等待，本次订单号【'.$_POST['out_orderid'].'】，如有疑问请联系客服！';
				$message_data['date']    = date("Y-m-d H:i:s",time());
				Db('capital')->where('id',$_POST['id'])->update(['state'=>1]);
                $a=Db('capital')->where('id',$_POST['id'])->find();
                $time    = date("Y-m-d H:i:s",time());
                $map['out_orderid']=$a['out_orderid'];
                $map['method']='withdraw';
                $map['belong']=$a['belong'];
                $map['type']=$a['type_kind'];
                $map['account']=  $a['account'] ;
                $map['amount']=  $real_amount ;
                $map['subject']=  $a['type'] ;
                $map['body']=  $a['userid'] ;
                $map['trans_time']= $time ;
                $map['invite']= $a['invite'] ;
                $map['state']= '出金成功' ;
                Db('record')->insert($map);
				$message_add = $message->insert($message_data);
				if ($_POST['phone']!='') {
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/withdraw_success.php';
                    $data_val['phone'] = $_POST['phone'];
                    $data_val['account'] = $_POST['account'];
                    $data_val['money'] = $real_amount;
                    php_post($url, $data_val);

                }
                if ($_POST['invite_phone']!='') {
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/withdraw_success.php';
                    $data_val['phone'] = $_POST['invite_phone'];
                    $data_val['account'] = $_POST['account'];
                    $data_val['money'] = $real_amount;
                    php_post($url, $data_val);

                }

                $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/withdraw_success.php';
                $data_val['phone'] = '18206068975';
                $data_val['account'] = $_POST['account'];
                $data_val['money'] = $real_amount;
                php_post($url, $data_val);
			}
		}
		return json($arr);
	}
	public function withdraw_error(){
		$message=Db('message');
		$arr['flag']=0;
		if(!empty($_POST['out_orderid'])){
			$record_data['state']      = '出金失败';
			$record_data['notifytime'] = date("Y-m-d H:i:s",time());

			$row = Record::getsave(['out_orderid' => $_POST['out_orderid']],$record_data);

				if($row !== false){
				$arr['flag']=1;
                    if($_POST['amount']=='全部'){
                        $real_amount ='全部-2';
                    }else{
                        $real_amount = number_format($_POST['amount']-2,2);
                    }
				$message_data['userid']  = $_POST['userid'];
				$message_data['type']    = 2;
				$message_data['state']   = 2;
				$message_data['title']   = '您的出金申请已失败';
				$message_data['content'] = '尊敬的客户，您申请的出金'.$_POST['amount'].'元已失败，失败原因：'.$_POST['error_text'].'，本次订单号【'.$_POST['out_orderid'].'】，如有疑问请联系客服！';
				$message_data['date']    = date("Y-m-d H:i:s",time());
                    Db('capital')->where(['id' => $_POST['id']])->update(['state'=>2]);

					$message_add=$message->insert($message_data);
					$a=Db('capital')->where(['id' => $_POST['id']])->find();
                    $time    = date("Y-m-d H:i:s",time());
                    $map['out_orderid']=$a['out_orderid'];
                    $map['method']='withdraw';
                    $map['belong']=$a['belong'];
                    $map['type']=$a['type_kind'];
                    $map['account']=  $a['account'] ;
                    $map['amount']=  $real_amount ;
                    $map['subject']=  $a['type'] ;
                    $map['body']=  $a['userid'] ;
                    $map['trans_time']= $time ;
                    $map['invite']= $a['invite'] ;
                    $map['state']= '出金失败' ;
                    Db('record')->insert($map);
                    if ($_POST['phone']!='') {
                        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/withdraw_error.php';
                        $data_val['phone'] = $_POST['phone'];
                        $data_val['account'] = $_POST['account'];
                        $data_val['money'] = $real_amount;
                        $data_val['text'] = $_POST['error_text'];
                        php_post($url, $data_val);

                    }
                    if ($_POST['invite_phone']!='') {
                        $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/withdraw_error.php';
                        $data_val['phone'] = $_POST['invite_phone'];
                        $data_val['account'] = $_POST['account'];
                        $data_val['money'] = $real_amount;
                        $data_val['text'] = $_POST['error_text'];
                        php_post($url, $data_val);

                    }



			}

		}
		return json($arr);
	}
	/*
	 * 出金记录
	 * 时间区间+条件查询
	 */
	public function record_withdraw(){
		$capital = Db('capital');
		$input   = input('');
		if(!empty($input['start_date'])){
    		$map['replytime'] = ['between time',array($input['start_date'],$input['end_date'])];
    	}else{
    		$map['replytime'] = ['> time',date('Y-m-d H:i:s',strtotime('-1 day'))];
    		$this->assign('start_date',date('Y-m-d H:i:s',strtotime('-1 day')));
    		$this->assign('end_date',date('Y-m-d H:i:s',time()));
    	}
    	
    	if(!empty($input['capital_type']) && $input['capital_type']==='0'){
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
		$map['method'] = array('in','withdraw,2');
		
		$withdraw = CapitalModel::where($map)->order('replytime desc')->paginate(30,false,['query' => input('param.')]);
		$page     = $withdraw->render();
		$this->assign('withdraw',$withdraw);
		$this->assign('page',$page);
		return $this->fetch();
	}
	
	/*
	 * 出金记录详情
	 */
	public function detail_record_withdraw(){
        $invitelist = Db('invitelist');
        $user       = Db('user');
        $xgjuser    = Db('xinguanjia');
        if(input('id')){
            $withdraw = CapitalModel::get(input('id'));
            if($withdraw['amount']==0){
                $real_amount ='全部-2';
            }else{
                $real_amount = number_format($withdraw['amount']-2,2);
            }
            if($withdraw['type_kind']=='aqihuo'){
                $this->assign('type_kind','国际期货');
            }elseif($withdraw['type_kind']=='dqihuo'){
                $this->assign('type_kind','国内期货');
            }elseif($withdraw['type_kind']=='shares'){
                $this->assign('type_kind','股票');
            }
            if(!empty($withdraw['invite'])){
                $agent = $invitelist->where("invite_code",$withdraw['invite'])->find();
                $this->assign('agent',$agent);
            }
            if($withdraw['capital_type'] == 1){
                $user = $xgjuser->where('id',$withdraw['userid'])->find();
            }else{
                $user = $user->where('id',$withdraw['userid'])->find();
            }
            $account_info=$xgjuser->where('account',$withdraw['account'])->find();
            if(empty( $account_info['invite_phone'])){
                $account=substr($withdraw['account'],0,3);
                $agent=Db('agent')->where('account_front',$account)->find();
                $b=$agent['phone'];
            }else{
                $b=$account_info['invite_phone'];
            }

            $this->assign('user_b',$b);
            $this->assign('user',$user);
            $this->assign('real_amount',$real_amount);
            $this->assign('withdraw',$withdraw);
            return $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
}