<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 7:03
 *
 * 网站用户列表
 */

namespace app\website\controller;
use think\controller;
use app\base\controller\Base;
use app\website\model\User as UserModel;
use app\xinguanjia\model\Xgjuser;

class Userlist extends Base{
//    用户列表
    public function yt_userlist(){
        if(!empty(input('delete'))){
            $user_row = UserModel::user();
            if(input('time') == $user_row['reg_time']){
                if($user_row['balance'] == 0){

                    $row = UserModel::dele();

                    $row=UserModel::dele();

                    if($row){
                     $this->success('删除成功','yt_userlist');
                    }else{
                        $this->error('删除失败','yt_userlist');
                    }
                }else{
                    echo "<script>alert('删除失败！用户还有余额！');location.href='./yt_userlist'</script>";
                }
            }else{
                echo "<script>alert('删除失败！请联系相关技术人员');location.href='./yt_userlist'</script>";
            }
        }else{
        	$map = array();
        	if(!empty(input('condition')) && !empty(input('value'))) {
        		$map[input('condition')] = array('like',input('value').'%');
        	}
        	$userlist = UserModel::alls($map);
        	$show = $userlist->render();
        	$this->assign('userlist',$userlist);
        	$this->assign('page',$show);
        	echo $this->fetch();
        }
        
    }


//    修改用户信息
    public function detail_userinfo(){
        if(!empty(input('id'))){
            $userinfo = UserModel::userinfo();
            $this->assign('userinfo',$userinfo);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $id   = input('update');
            $data = trimArray(input());
            $row  = UserModel::saves($id,$data);
            if($row !== false){
            	if(!empty($data['a_account'])){
            		UserModel::saveXgj(input('update'),$data);
            	}
            	$this->success('修改成功','yt_userlist');
            }else{
                $this->error('修改失败！请重新修改...','\'".__CONTROLLER__."/detail_userinfo/id/".$id."\'');
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
}