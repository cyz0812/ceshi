<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/9/7 0007
 * Time: 下午 2:21
 */
namespace app\login\controller;
use think\Controller;
use app\website\model\User as UserModel;
use think\Session;
use think\Rsa;

class Reginvite extends Controller{
    public function reginvite(){
        $data=input('inviteCode');
       $this->success('','Index/regInvite'.'?inviteCode'.$data);

    }
}