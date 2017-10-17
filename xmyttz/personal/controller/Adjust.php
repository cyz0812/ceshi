<?php
/*
 * 调整手数模块
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
use app\xinguanjia\model\Prior as PriorModel;
class Adjust extends Base {
	//国际期货调整手数
	public function adjust(){
        $user = parent::loginUser('/Login/Login/login');
        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Capital/captial');
            getAlert(null,'/Personal/Userinfo/addcard');
        }
        $payway   = Payway::getselect(['display_xin' => 1]);
        $this->assign('payway',$payway);
        $this->assign('user',$user);
        $this->assign('out_orderid',date("ymdHis").rand(1000,9999));
        echo $this->fetch();
    }
    public function adjust_d(){
        $user = parent::loginUser('/Login/Login/login');
        if(empty($user['card'])){
            cookie('addcardPath','/Personal/Capital/captial');
            getAlert(null,'/Personal/Userinfo/addcard');
        }
        $payway   = Payway::getselect(['display_xinold' => 1]);
        $this->assign('payway',$payway);
        $this->assign('user',$user);
        $this->assign('out_orderid',date("ymdHis").rand(1000,9999));
        echo $this->fetch();
    }

	
	public function modify_hands(){
		$user = parent::loginUser('/Login/Login/login');
		//记录数据整理
		$data_record = pay::record();
		$data_record['belong']  = 'xmyttz';
		$data_record['method']  = 'prior';
		$data_record['subject'] = $_POST['type'];
		$data_record['state']   = '已申请';
		
		$record_row = Record::getadd($data_record);
		if(!$record_row){
			$arr['flag']=0;
			return json($arr);
		}
		//出金数据整理
		$data = pay::capital();
		$data['belong']       = 'xmyttz';
		$data['pay_type']     = 0;
		$data['method']       = 'prior';
		$data['type']         = $_POST['type'];
		$data['state']        = 0;
		$capital_row = Capital::getadd($data);
		if(!!$capital_row){
			$arr['flag']=1;
		}
		return json($arr);
	}
    public function jumpprior(){
        $data = pay::capital();

        $data['belong']       = 'xmyttz';
        $data['pay_type']     = 0;
        $data['method']       = 'prior';
        $data['type']         = $_POST['type'];
        $data['state']        = 0;

        $capital_row = Capital::getadd($data);
        if(!!$capital_row){
            $arr['flag']=1;
        }
        return json($arr);
    }
}