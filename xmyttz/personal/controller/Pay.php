<?php
/*
 * 国际、国内期货支付模块
 */
namespace app\personal\controller;
use app\login\controller\Base;
use app\trade\model\Erweima;
use app\trade\model\Payway;
use app\info\model\Record;
use app\xinguanjia\model\Capital;
use app\xinguanjia\model\Agent;
use think\Session;
use think\Rsa;
class Pay extends Base {
    public function old() {
        $user = parent::loginUser('/Login/Register/register');

        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Pay/old');
            getAlert(null,'/Personal/Userinfo/addcard');
        }

        $payway   = Payway::getselect(['display_old' => 1]);
        $this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
        $zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
        $weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
        $this->assign('zhifubao',$zhifubao);
        $this->assign('weixin',$weixin);
        $this->assign('user',$user);
        $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));

        echo $this->fetch();
    }
    public function olds() {
        $user = parent::loginUser('/Login/Register/register');

        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Pay/olds');
            getAlert(null,'/Personal/Userinfo/addcard');
        }

        $payway   = Payway::getselect(['display_old' => 1]);
        $this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
        $zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
        $weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
        $this->assign('zhifubao',$zhifubao);
        $this->assign('weixin',$weixin);
        $this->assign('user',$user);
        $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));

        echo $this->fetch();
    }
	//国际期货支付
	public function aqihuoPay() {
		$user = parent::loginUser('/Login/Register/register');
		
		if(empty($user['card'])){
    		cookie('addcardPath','/Personal/Pay/aqihuoPay');
    		getAlert(null,'/Personal/Userinfo/addcard');
    	}
    	
    	$payway   = Payway::getselect(['display_xmyt' => 1]);
    	$this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
    	$zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
    	$weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
    	$this->assign('zhifubao',$zhifubao);
    	$this->assign('weixin',$weixin);
    	$this->assign('user',$user);
    	$this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
		
		echo $this->fetch('aqihuoPay');
	}
    public function open() {
        $user = parent::loginUser('/Login/Register/register');

        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Pay/aqihuoPay');
            getAlert(null,'/Personal/Userinfo/addcard');
        }

        $payway   = Payway::getselect(['display_agent' => 1]);
        $this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
        $zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
        $weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
        $this->assign('zhifubao',$zhifubao);
        $this->assign('weixin',$weixin);
        $this->assign('user',$user);
        $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));

        echo $this->fetch();
    }
	//国际期货协议
	public function InternationalContract(){
		echo $this->fetch();
	}
	
	//国内期货支付
	public function dqihuoPay() {
		$user = parent::loginUser('/Login/Register/register');
	
		if(empty($user['card'])){
			cookie('addcardPath','/Personal/Pay/aqihuoPay');
			getAlert(null,'/Personal/Userinfo/addcard');
		}
		 
		$payway   = Payway::getselect(['display_xmyt' => 1]);
		$this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
		$zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
		$weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
		$this->assign('zhifubao',$zhifubao);
		$this->assign('weixin',$weixin);
		$this->assign('user',$user);
		$this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
	
		echo $this->fetch();
	}
    public function open_d() {
        $user = parent::loginUser('/Login/Register/register');

        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Pay/aqihuoPay');
            getAlert(null,'/Personal/Userinfo/addcard');
        }

        $payway   = Payway::getselect(['display_agent' => 1]);
        $this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
        $zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
        $weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
        $this->assign('zhifubao',$zhifubao);
        $this->assign('weixin',$weixin);
        $this->assign('user',$user);
        $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));

        echo $this->fetch();
    }
	//国内期货协议
	public function DomesticContract(){
		echo $this->fetch();
	}
	
	//微信二维码界面
	public function weixinqr(){
		$this->assign('info',$_POST);
		echo $this->fetch();
	}
	
	/*
	 * 支付ajax返回函数
	 */
	
	//商银信支付
	public function invest_record(){
		$user = parent::loginUser();
		if(!empty($_POST['amount']) && $user){
			$_POST['type']       = $_POST['type_kind'];
			$_POST['invite']     = $user['invite'];
			$_POST['belong']     = 'xmyttz';
			$_POST['trans_time'] = date('Y-m-d H:i:s',time());
			$_POST['state']      = '未支付';
			
			$row = Record::getadd($_POST);
			if($row){
				$arr['flag']=1;
			}else{
				$arr['flag']=0;
			}
			return json($arr);
		}
	}
	
	//连连支付
	public function webllpay_pay(){
		parent::loginUser();
		$data_record = $this->record();
		$data_record['belong']  = 'xmyttz';
		$data_record['method']  = $_POST['method'];
		$data_record['subject'] = '网银充值';
		$data_record['state']   = '未支付';
		$record_row = Record::getadd($data_record);
		if(!$record_row){
			$arr['flag']=0;
			return json($arr);
		}
		
		$data = $this->capital();
		$data['belong'] 	  = 'xmyttz';
		$data['pay_type']     = 02;
		$data['method']		  = $_POST['method'];
		$data['type']         = '连连网银支付';
		$data['state']        = '-1';
		$capital_row = Capital::getadd($data);
		if(!!$capital_row){
			$arr['flag']=1;
		}else{
			$arr['flag']=0;
		}
		return json($arr);
	}
	
	//连连微信支付
	public function weixin_pay(){
		parent::loginUser();
		$data_record = $this->record();
		$data_record['belong']  = 'xmyttz';
		$data_record['method']  = $_POST['method'];
		$data_record['subject'] = '微信充值';
		$data_record['state']   = '未支付';
		$record_row = Record::getadd($data_record);
		if(!$record_row){
			$arr['flag']=0;
			return json($arr);
		}
	
		$data = $this->capital();
		$data['belong'] 	  = 'xmyttz';
		$data['pay_type']     = 04;
		$data['method']       = $_POST['method'];
		$data['type']         = '连连微信支付';
		$data['state']        = '-1';
		$capital_row = Capital::getadd($data);
		if(!!$capital_row){
			$arr['flag']=1;
		}else{
			$arr['flag']=0;
		}
		return json($arr);
	}
	
	//支付宝支付
	public function zfb_pay(){
		$user = parent::loginUser('/Login/Login/login');
		$time=date('Y-m-d H:i:s');
		//记录数据整理
		$data_record = $this->record();
		$data_record['belong'] 	   = 'xmyttz';
		$data_record['method']     = $_POST['method'];
		$data_record['subject']    = '支付宝充值';
		$data_record['state']      = '已提交';
		$record_row = Record::getadd($data_record);
		if($record_row){
			//支付数据整理
 			$data = $this->capital();
 			$data['belong']  		= 'xmyttz';
 			$data['pay_type']       = 03;
 			$data['method']         = $_POST['method'];
 			$data['type']		    = '支付宝充值';
 			$data['state']          = '0';
 			$capital_row = Capital::getadd($data);
			if($capital_row){
				$arr['flag']=1;
				//短信数据整理
				$url = 'http://xmyttz.com/master/demo/erweima_apply.php';
				
				$data_val['phone'] = config('MESSAGE_PHONE');
				if(empty($_POST['account'])){
					$data_val['account']  = '未开户';
				}else{
					$data_val['account']  = $_POST['account'];
				}
				$data_val['kind']          = $data['type'];
				$data_val['name']          = $user['name'];
				$data_val['nickname']      = $data['nickname'];
				$data_val['account_phone'] = $user['phone'];
				if(!intval($_POST['amount'])){
					$data_val['money'] = '全部-2';
				}else{
					$data_val['money'] = number_format($_POST['amount']-2,2);
				}
				php_post($url, $data_val);
			}
		}else{
			$arr['flag']=0;
		}
		return json($arr);
	}

//	支付宝充值界面
    public function zhifubao(){

	    return $this->fetch();
    }

//微信支付返回
    public function had_pay(){
        $map['out_orderid']=$_POST['no_order'];
        $info = Capital::getfind($map);
        if(!empty($info) && $info['state'] == 0){
            $arr['flag'] = 1;
        }else{
            $arr['flag'] = 0;
        }
       return json($arr);
    }


    /*
     * 添加记录数据函数
     */
    public static function record(){
        $user = Base::loginUser();
        if($user){
            $data['out_orderid']  = $_POST['out_orderid'];
            $data['type']         = $_POST['type_kind'];
            $data['contract']     = !empty($_POST['contract']) ? $_POST['contract'] : null;
            $data['account']      = $_POST['account'];
            $data['amount']       = !empty($_POST['amount']) ? $_POST['amount'] : 0;
            $data['hands']		  = !empty($_POST['hands']) ? $_POST['hands'] : null;
            $data['body']         = $user['id'];
            $data['invite']       = $user['invite'];
            $data['trans_time']   = date('Y-m-d H:i:s',time());

            return $data;
        }
    }

    /*
     * 添加支付数据函数
     */
    public static function capital(){
        $user = Base::loginUser();
        if($user){
            $data['capital_type'] = '0';
            $data['userid']       = $user['id'];
            $data['out_orderid']  = $_POST['out_orderid'];
            $data['order_num']    = !empty($_POST['order_num']) ? $_POST['order_num'] : null;
            $data['contract']     = !empty($_POST['contract']) ? $_POST['contract'] : null;
            $data['amount']       = !empty($_POST['amount']) ? $_POST['amount'] : 0;
            $data['hands']		  = !empty($_POST['hands']) ? $_POST['hands'] : null;
            $data['account']      = $_POST['account'];
            $data['name']         = $user['name'];
            $data['nickname']     = !empty($_POST['nickname']) ? $_POST['nickname'] : null;
            $data['idcard']       = $user['idcard'];
            $data['phone']        = $user['phone'];
            $data['bankname']     = $user['bankname'];
            $data['card']         = $user['card'];
            $data['invite']       = $user['invite'];
            $data['type_kind']    = $_POST['type_kind'];
            $data['sendtime']     = date("Y-m-d H:i:s",time());

            return $data;
        }
    }
    public function help(){
        $user = parent::loginUser('/Login/Register/register');

        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Pay/help');
            getAlert(null,'/Personal/Userinfo/addcard');
        }

        $payway   = Payway::getselect(['display_xmyt' => 1]);
        $this->assign('payway',$payway);
        $payway_phone   = Payway::getselect(['display_phone' => 0]);
        $this->assign('payway_phone',$payway_phone);
        $zhifubao = Erweima::getfield(array('type'=>'zhifubao','state'=>1),'img');
        $weixin   = Erweima::getfield(array('type'=>'weixin','state'=>1),'img');
        $this->assign('zhifubao',$zhifubao);
        $this->assign('weixin',$weixin);
        $this->assign('user',$user);
        $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
        echo $this->fetch();
    }
    public function left() {
        $payway   = Payway::getselect(['display_xmyt' => 1]);
        $this->assign('payway',$payway);

        echo $this->fetch();
    }
    public function ceshi(){
        echo $this->fetch();
    }
}
