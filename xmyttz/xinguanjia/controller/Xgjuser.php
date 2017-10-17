<?php
/*
 * 信管家用户管理模块
 * 增、改、查、删
 * add by liang 2017-08-10
 */
namespace app\xinguanjia\controller;
use app\base\controller\Base;
use app\xinguanjia\model\Xgjuser as XgjuserModel;
use think\Csv;
class Xgjuser extends Base {
	public function yt_xgjuser() {
		if(!empty(input('delete'))) {
			$row = XgjuserModel::del(input('delete'));
			if($row) {
				$this->success('删除成功','yt_xgjuser');
			}else{
				$this->error('删除失败！请重新删除','yt_xgjuser');
			}
		}else{
			$map = array();
			if(!empty(input('condition')) && !empty(input('value'))) {
				$map[input('condition')] = array('like',input('value').'%');
			}
			$userlist = XgjuserModel::where($map)->where('del',0)->order('account')->paginate(30,false,['query' => input('param.')]);
			$page = $userlist->render();
			$this->assign('userlist',$userlist);
			$this->assign('page',$page);
			return $this->fetch();
		}
	}
	public function export() {
		if(!empty($_POST['code'])) {
			$_SESSION['csv_code'] = 123456;
			if(!empty($_SESSION['csv_code']) && $_POST['code'] == $_SESSION['csv_code']){
				$list = XgjuserModel::select();
				$csv_title=array('id','期货账户','姓名','绑定银行卡','银行名称','开户省','开户市','支行名称','支付宝账号','手机号','代理代码','注册时间');
				Csv::put_csv($list,$csv_title);
			}
		}
	}
	public function detail_xgjuser() {
		if(!empty(input('id'))){
			$userinfo = Db('xinguanjia')->where('id',input('id'))->find();
            $this->assign('userinfo',$userinfo);
            $zfb_num     = $userinfo['nickname'];
            $this->assign('zfb_num',$zfb_num);
            $account=substr($userinfo['account'],0,3);
            $agent=Db('agent')->where('del',0)->where('account_front',$account)->find();
            if(!empty($userinfo['invite_phone'])&&$userinfo['invite_phone']!= $agent['phone']){
                $data['invite_phone']=$userinfo['invite_phone'];
               Db('xinguanjia')->where('id',input('id'))->update($data);
            }else{
                $data['invite_phone']=$agent['phone'];
                Db('xinguanjia')->where('id',input('id'))->update($data);
            }
            $this->assign('agent', $data['invite_phone']);

            return $this->fetch();
		}else if(!empty(input('update'))){
		    $userinfo = XgjuserModel::get(input('update'));
            $account=substr($userinfo['account'],0,3);
            $agent=Db('agent')->where('del',0)->where('account_front',$account)->find();

			if($_POST['cardprovince']='请选择'){
				$_POST['cardprovince']=null;
				$_POST['cardcity']=null;
			}
			if($userinfo['account']!=$_POST['account']){
				$account_row = XgjuserModel::get(['account' => $_POST['account']]);
			}
			if(empty($account_row)){
			    $data=$_POST;
                if($_POST['invite_phone']!= $agent['phone']){
                    $data['invite_phone']=$_POST['invite_phone'];
                }else{
                    $data['invite_phone']=$agent['phone'];
                }

				$row = XgjuserModel::where('id',input('update'))->strict(false)->update($data);
                Db('invitelist')->where('invite_code',input('invite'))->strict(false)->update($data);

                if($row !== false){
					echo "<script>alert('修改成功！');location.href='".$_POST['last_url']."'</script>";
				}else{
					echo "<script>alert('修改失败！请重新修改...');history.back(-1);</script>";
				}
			}else{
				echo "<script>alert('修改失败！改账号已存在');history.back(-1);</script>";
			}
		}
	}
	public function add_xgjuser(){
		if(!empty($_POST['account'])){
			$xgj_row = XgjuserModel::get(['account' => $_POST['account']]);
			if(!$xgj_row){
				if($_POST['cardprovince']='请选择'){
					$_POST['cardprovince']=null;
					$_POST['cardcity']=null;
				}
				$add_row = XgjuserModel::create($_POST);
				if($add_row){
					$this->success('添加成功','yt_xgjuser');
				}else{
					echo "<script>alert('添加失败,请重新添加);history.back(-1);</script>";
				}
			}else{
				echo "<script>alert('添加失败！改账号已存在');history.back(-1);</script>";
			}
		}else{
			return $this->fetch();
		}
	}
}