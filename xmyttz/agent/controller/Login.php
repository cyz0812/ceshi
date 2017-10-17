<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/24 0024
 * Time: 上午 9:42
 *
 * 去logo会员登录
 */

namespace app\agent\controller;
use think\Controller;
use app\website\model\User as UserModel;
use think\Session;
use think\Rsa;


class Login extends Controller{
//
    public function login(){
        if(!empty($_POST['phone']) && !empty($_POST['password'])){

            $_POST['phone']    = Rsa::privDecrypt($_POST['phone']);
            $_POST['password'] = Rsa::privDecrypt($_POST['password']);

            $map['phone'] = $_POST['phone'];
            $phone_user   = UserModel::getfind($map);
            if(!empty($phone_user)){
                if($phone_user['password'] == sha1($_POST['password'])){

                    $data['login_time'] = time();
                    UserModel::saves($phone_user['id'],$data);

                    session('username'   , $phone_user['username']);
                    session('face'       , $phone_user['face']);
                    session('uniqid'     , $phone_user['uniqid']);
                    session('phone'      , $phone_user['phone']);
                    $arr['ret'] = 'success';

                }else{
                    $arr['ret'] = 'error';
                }
            }else{
                $arr['ret']     = null;
            }
            return json($arr);
        }else{
            $this->assign('phone','');
            $this->assign('pwd','');
            echo $this->fetch();
        }
    }


//    退出
    public function logout(){
        session(null);
        getAlert(null,'/agent/login/login');
    }


    //密码找回
    public function findpwd(){
        if(!empty($_POST['phone']) && !empty($_POST['password']) && !empty($_POST['code']) ){
            session_start();
            $arr = array();
            if($_POST['code']==$_SESSION['code'] && $_POST['phone']==$_SESSION['code_phone']){
                $_SESSION = array();
                session(null);

                $map['phone']     = $_POST['phone'];
                $data['password'] = sha1($_POST['password']);

                $row = UserModel::getsave($map,$data);
                if($row!==false){
                    $arr['ret'] = 'success';
                }
            }else{
                $arr['ret'] = 'error';
            }
            return json($arr);
        }else{
            echo $this->fetch();
        }
    }


    //验证是否已注册
    public function has_phone(){
        $arr['flag'] =1;

        $map['phone'] = $_POST['phone'];

        $phone = UserModel::getfind($map);

        if(!empty($phone)){
            $arr['flag']=0;
        }
        return json($arr);
    }


}