<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/11 0011
 * Time: 上午 9:13
 *
 * 客户开户、信管家开户记录
 */

namespace app\website\controller;

use think\controller;

use app\base\controller\Base;
use app\xinguanjia\model\Capital as CapitalModel;
use app\website\model\Open as OpenModel;
use app\website\model\User;
use app\xinguanjia\model\Xgjuser;


class Open extends Base{

	//申请开户列表
    public function yt_open()
    {
        $open_a = OpenModel::aqihuo();
        $this->assign('open_a', $open_a);
        $open_d = OpenModel::dqihuo();
        $this->assign('open_d', $open_d);
        $open_s = OpenModel::shares();
        $this->assign('open_s', $open_s);
        echo $this->fetch();
    }


	//开户信息详情
    public function detail_open() {
    	$user       = Db('user');
    	$xgjuser    = Db('xinguanjia');
        if (input('id')) {
            $deposit = OpenModel::deposit();
            $fee = number_format($deposit['amount'] * 3 / 1000, 2);
            $real_amount = number_format($deposit['amount'] - $fee, 2);
            $this->assign('deposit', $deposit);
            $this->assign('fee', $fee);
            $this->assign('real_amount', $real_amount);
            if (!!$deposit['userid']) {
          		if($deposit['capital_type'] == 1){
					$account_user = $xgjuser->where('id',$deposit['userid'])->find();
				}else{
					$account_user = $user->where('id',$deposit['userid'])->find();
				}

                $this->assign('user', $account_user);
            }
       		if(!empty($deposit['invite'])){
				$agent = Db('invitelist')->where("invite_code",$deposit['invite'])->find();
				$this->assign('agent',$agent);
			}
            if (input('day') != -1) {
                if (input('day')) {
                    $record_map['trans_time'] = array('GT', date('Y-m-d H:i:s', strtotime('-' . input('day') . ' day')));
                } else {
                    $record_map['trans_time'] = array('GT', date('Y-m-d H:i:s', strtotime('-1 week')));
                }
            }
            if (!empty(input('recordtype')) && input('recordtype') != -1) {
                $record_map['method'] = input('recordtype');
            }
            $record_map['body'] = $deposit['userid'];
            $user_record = OpenModel::counts();
            $show = $user_record->render();
            $this->assign('user_record', $user_record);
            $this->assign('page', $show);
            echo $this->fetch();
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }

    //开户回复
    public function reply_open() {
    	$time = date("Y-m-d H:i:s", time());
    	if (!empty(input('id'))) {
    		$capitals = OpenModel::deposit();
    		$this->assign('capital', $capitals);
    		echo $this->fetch();
    	} elseif (!empty(input('success'))) {
    		$data['state'] = 1;
    		$data['replytime'] = $time;
    		$row = OpenModel::row($data);
    		if (!!$row) {
                getAlert('处理成功','/website/open/yt_open');
    		} else {
                getAlert('回复数据更新失败，请联系相关技术人员！','/website/open/yt_open');

    		}
    	}
    	elseif (!empty(input('error'))) {
    		$out_orderid = OpenModel::orderid();
    		$record_data['state'] = '申请失败';
    		$record_data['notifytime'] = date("Y-m-d H:i:s", time());
    		OpenModel::record($out_orderid, $record_data);
    		$data['state'] = 2;
    		$data['replytime'] = $time;
    		$row = OpenModel::saves($data);
    		if (!!$row) {
    			getAlert('处理成功','/website/open/yt_open');
    		} else {
    		    getAlert('处理失败，请重试','/website/open/yt_open');
    		}
    	}
    	else {
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }

    //开户成功
    public function open_success(){
    	if(!empty(input('userid'))  &&  !empty(input('type_kind')) &&  !empty(input('account'))){
    		$data = array();
    		if(input('type_kind')=='aqihuo'){
    			$data['a_account']          = input('account');
    			$data['a_account_password'] = input('account_password');

    			OpenModel::addXgj(input('userid'),input('account'),$_POST['invite_phone']);


    		}elseif(input('type_kind')=='dqihuo'){
    			$data['d_account']=input('account');
    			$data['d_account_password']=input('account_password');
    		}elseif(input('type_kind')=='shares'){
    			$data['s_account']=input('account');
    			$data['s_account_password']=input('account_password');
    		}
    		$row=OpenModel::user($data);
    		if($row === false){
    			$arr['flag']=0;
    		}else{
    			/* $message_data['userid']=$_POST['userid'];
    			$message_data['type']=2;
    			$message_data['state']=0;
    			$message_data['title']='您的开户配资已成功';
    			$message_data['content']='尊敬的用户，您的账户【'.$_POST['account'].'】已开通，登录密码为【'.$_POST['account_password'].'】，支付本金为【'.$_POST['amount'].'】元的配资方案已成功到账，本次订单号为【'.$_POST['out_orderid'].'】，如有疑问请联系客服！';
    			$message_data['date']=date("Y-m-d H:i:s",time());
    			$message_add=$message->add($message_data); */
    			$arr['flag']=1;
    		} return json($arr);
    	}
    }

	//代理开户成功
    public function agent_open_success(){
	    $time=date("Y-m-d H:i:s",time());
	    if(!empty(input('userid'))){
	        if(input('type_kind')=='aqihuo'){
	            $data['a_account']=input('account');
	            $data['a_account_password']=input('account_password');
	        }elseif(input('type_kind')=='dqihuo'){
	            $data['d_account']=input('account');
	            $data['d_account_password']=input('account_password');
	        }elseif(input('type_kind')=='shares'){
	            $data['s_account']=input('account');
	            $data['s_account_password']=input('account_password');
	        }
	        OpenModel::user($data);
	        $data['state']=1;
	        $data['replytime']=$time;
	        $row=OpenModel::rows($data);
	        if($row === false){
	            $arr['flag']=0;
	        }else{
	            $arr['flag']=1;
	        }
	        return json($arr);
	    }
	}


    public function open_error(){
        $capital = Db('capital');
        $time    = date("Y-m-d H:i:s",time());
        $input   = input('');
        $withdraw = CapitalModel::get($input['error']);

            $this->assign('withdraw',$withdraw);
            return $this->fetch();

    }
    public function webopen_error(){
        $time    = date("Y-m-d H:i:s",time());
        $message=Db('message');
        $arr['flag']=0;
        if(!empty($_POST['id'])){
            $record_data['state']      = '2';
            $record_data['notifytime'] = date("Y-m-d H:i:s",time());
            $row=Db('capital')->where('id',input('id'))->update($record_data);

            if($row !== false){
                $arr['flag']=1;
                $message_data['userid']  = $_POST['userid'];
                $message_data['type']    = 2;
                $message_data['state']   = 2;
                $message_data['title']   = '您的开户申请已失败';
                $message_data['content'] = '尊敬的客户，您申请的开户失败';
                $message_data['date']    = date("Y-m-d H:i:s",time());
                $message_add=$message->insert($message_data);
                $a=Db('capital')->where(['id' => $_POST['id']])->find();
                $time    = date("Y-m-d H:i:s",time());
                $map['out_orderid']=$a['out_orderid'];
                $map['method']='open';
                $map['belong']=$a['belong'];
                $map['type']=$a['type_kind'];
                $map['account']=  $a['account'] ;
                $map['amount']=  $a['amount'] ;
                $map['subject']=  $a['type'] ;
                $map['body']=  $a['userid'] ;
                $map['trans_time']= $time ;
                $map['invite']= $a['invite'] ;
                $map['state']= '开户失败' ;
                Db('record')->insert($map);
                if ($_POST['phone']!='') {
                    $url = 'http://' . $_SERVER['HTTP_HOST'] . '/master/demo/open_error.php';
                    $data_val['phone'] = $_POST['phone'];

                    $data_val['money'] = $_POST['amount'];
                    $data_val['text'] = $_POST['text'];
                    php_post($url, $data_val);

                }

            }
            return json($arr);
        }

    }

}