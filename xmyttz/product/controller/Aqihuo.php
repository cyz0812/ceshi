<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23 0023
 * Time: 上午 10:14
 *
 * 国际期货
 */
namespace app\product\controller;

use app\login\controller\Base;

class Aqihuo extends Base{

    public function aqihuo(){

        $aqihuo=Db('aqihuo');
        $user=Db('user');
        if(!empty(input('type'))){
            $good   =   $aqihuo->where("type",input('type'))->find();
        }else{
            $good   =   $aqihuo->where("type",'hsi')->find();
        }
        $goods  =   $aqihuo->where('state=1')->select();
        if(session('?phone')){
            $map['phone']   =   session('phone');
            $user_row       =   Db('user')->where($map)->find();
            $this->assign('balance',$user_row['balance']);
            $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
            $this->assign('login_state',1);
            $this->assign('account',$user_row['username']);
            $this->assign('user',$user_row);
        }else{
            $user_row   =   Db('user')->find();
            $this->assign('balance',$user_row['balance']);
            $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
            $this->assign('login_state',1);
            $this->assign('account',$user_row['username']);
            $this->assign('user',$user_row);
        }
        $this->assign('goods',$goods);
        $this->assign('good',$good);

        echo $this->fetch();
    }

}

