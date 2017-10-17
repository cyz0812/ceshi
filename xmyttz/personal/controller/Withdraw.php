<?php
/*
 * 出金模块
 */
namespace app\personal\controller;
use app\login\controller\Base;
use app\personal\controller\Pay;
use app\trade\model\Erweima;
use app\trade\model\Payway;
use app\info\model\Record;
use app\xinguanjia\model\Capital;
use app\xinguanjia\model\Agent;
use think\Session;
use think\Rsa;
class Withdraw extends Base {
	public function withdraw(){
		$user = parent::loginUser('/Login/Login/login');
		$input = input();
		if(empty($input['type'])){
			$input['type'] = 'aqihuo';
		}
		if(empty($user['card'])){
    		cookie('addcardPath','/Personal/Pay/aqihuoPay');
    		getAlert(null,'/Personal/Userinfo/addcard');
    	}
		if($input['type']=='aqihuo'){
			$this->assign('typename','国际期货');
			$this->assign('account',$user['a_account']);
			$this->assign('account_password',$user['a_account_password']);
		}elseif($input['type']=='dqihuo'){
			$this->assign('typename','国内期货');
			$this->assign('account',$user['d_account']);
			$this->assign('account_password',$user['d_account_password']);
		}elseif($input['type']=='shares'){
			$this->assign('typename','国内股票');
			$this->assign('account',$user['s_account']);
			$this->assign('account_password',$user['s_account_password']);
		}
		$card = substr($user['card'], 0, 4).'***********'.substr($user['card'], 15);
		$this->assign('card',$card);
		$this->assign('user',$user);
		$this->assign('out_orderid','YCJ'.date("ymdHis").rand(1000,9999));
		
		echo $this->fetch();
	}
	public function webWithdraw_pay(){
		$user = parent::loginUser('/Login/Login/login');
		//记录数据整理
		$data_record = pay::record();
		$data_record['belong']  = 'xmyttz';
		$data_record['method']  = $_POST['method'];
		$data_record['subject'] = '账户出金';
		$data_record['state']   = '处理中';
        $data_record['amount']       = (float)$_POST['amount'];
		$record_row = Record::getadd($data_record);
		if(!$record_row){
			$arr['flag']=0;
			return json($arr);
		}
		//出金数据整理

		$data = pay::capital();
		$data['amount']       = (float)$_POST['amount'];
		$data['belong'] 	  = 'xmyttz';
		$data['pay_type']     = 0;
		$data['method']       = $_POST['method'];
		$data['type']         = '网站出金';
		$data['state']        = 0;

		$capital_row = Capital::getadd($data);
		if(!!$capital_row){
			$arr['flag'] = 1;
			//短信数据整理
			if($_POST['amount']=='全部提现'|| $_POST['amount']=='全部出金'|| $_POST['amount']=='全部'){
				$real_amount=$_POST['amount'].'-2';
			}else{
				$real_amount=number_format($_POST['amount']-2,2);
			}
			$url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/message_4send_demo.php';
			$data_val['phone']      = config('MESSAGE_PHONE');
			$data_val['kind']   	= '网';
			$data_val['name']   	= $user['name'];
			$data_val['bank']   	= $user['bankname'];
			$data_val['card']  		= $user['card'];
			$data_val['account'] 	= $data['account'];
			$data_val['money']      = $_POST['amount'];
			$data_val['real_money'] = $real_amount;
			php_post($url, $data_val);
		}else{
			$arr['flag'] = 0;
			$record_data['state'] = '出金失败';
			$record_row = Record::getsave(['out_orderid' => $_POST['out_orderid']],$data_record);
		}
		return json($arr);
	}
}