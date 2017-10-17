<?php
/*
* 代理申请开户模块
*/

namespace app\website\controller;
use think\controller;
use app\base\controller\Base;
use app\website\model\Submission as SubModel;

class Submission extends Base{
	public function yt_submission(){
		$submission = SubModel::getselect(['state' => 0]);
		$this->assign('submission',$submission);
		return $this->fetch();
	}
	public function detail_submission(){
		if(input('id')){
			$submission = SubModel::getfind(['id' => input('id')]);
			$this->assign('submission',$submission);
			return $this->fetch();
		}elseif(input('done')){
			$data['dealtime'] = date('Y-m-d H:i:s');
			$data['state']    = 1;
			$row = SubModel::getsave(['id' => input('done')],$data);
			if($row!==false){
				getAlert('处理成功','/website/submission/yt_submission');
			}else{
				getAlert('处理成功','back');
			}
		}else{
			getAlert(null,'back');
		}
	}
}