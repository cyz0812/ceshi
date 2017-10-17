<?php
/**
 *
 * 交易通道切换模块
 */

namespace app\trade\controller;

use app\base\controller\Base;
use app\trade\model\Payway as PaywayModel;

class Payway extends Base{
	
	//通道切换
	public function yt_payway() {
		$payway = PaywayModel::getselect();
		$this->assign('list',$payway);
		echo $this->fetch();
	}
	
	//通道切换ajax返回
	public function switch_display(){
		if($_POST['display']==1){
			$display = 0;
		}elseif($_POST['display']==0){
			$display = 1;
		}
		
		$map['id'] = $_POST['id'];
		
		$data[$_POST['name']] = $display;
		$data['date']         = date('Y-m-d H:i:s');
		
		$row = PaywayModel::getsave($map,$data);
		if($row===false){
			$arr['flag']=0;
		}else{
			$arr['flag']=1;
		}
		return json($arr);
	}
	
	//修改通道名称
	public function update_payway(){
		if(!empty(input('id'))){
			$info = PaywayModel::getfind(['id' => input('id')]);
			$this->assign('info',$info);
			echo $this->fetch();
		}else if(!empty(input('update'))){
			
			$data['date'] = date('Y-m-d H:i:s');
			$data         = trimArray($_POST);
			$row = PaywayModel::getsave(['id' => input('update')],$data);
			if($row !== false){
				getAlert('修改成功','/Trade/Payway/yt_payway');
			}else{
				getAlert('修改失败！请重新修改','back');
			}
		}
	}
}