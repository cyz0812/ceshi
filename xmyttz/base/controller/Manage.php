<?php
/*
 * 后台列表管理模块
 * 修改、移动左边列表
 * add by liang 2017-08-10
 */
namespace app\base\controller;
use app\base\controller\Base;
use app\base\model\Manage as ManageModel;
use think\Session;
class Manage extends Base {
    public function yt_adminlist() {
    	if(!empty(input('name'))&&!empty(input('url'))&&!empty(input('path'))&&!empty(input('order_num'))){
    		$row = ManageModel::addlist(input('post.'));
    		if($row){
    			echo "<script>alert('修改成功');window.parent.frames['left'].location.reload() ;location.href='/Base/Manage/yt_adminlist'</script>";
    		}else{
    			$this->success('添加失败，请重新添加...','yt_adminlist');
    		}
    	}elseif(!empty(input('delete'))){
    		$row = ManageModel::dellist(input('delete'));
    		if($row){
    			$this->success('删除成功','yt_adminlist');
    		}else{
    			$this->success('删除失败！请重新删除...','yt_adminlist');
    		}
    	}else{
    		$res   = ManageModel::adminlist();
    		$f_list = $res['f_list'];
    		$s_list = $res['s_list'];
    		foreach($f_list as $key => $v) {
    			foreach($s_list as $list_key => $list_v) {
    				if($list_v['path'] == $v['url']) {
    					$list[$key][$list_key] = $list_v;
    				}
    				if(empty($list[$key])){
    					$list[$key]=array();
    				}
    			}
    		}
    		$this->assign('f_list',$f_list);
    		$this->assign('list',$list);
    	}
    	return $this->fetch();
    }
    
    public function update_adminlist() {
    	if(!empty(input('id'))){
    		$list = ManageModel::findlist(input('id'));
    		if(!is_array($list)) $list=array();
    		$this->assign('list',$list);
    		
    		return $this->fetch();
    	}else if(!empty(input('update'))) {
    		$id   = input('update');
    		$post = input('post.');
    		$row = ManageModel::savelist($id,$post);
    		if($row !== false){
    			echo "<script>alert('修改成功');window.parent.frames['left'].location.reload() ;location.href='/Base/Manage/yt_adminlist'</script>";
    		}else{
    			echo "<script>alert('修改失败！请重新修改...');window.history.go(-1);</script>";
    		}
    	}
    }
}