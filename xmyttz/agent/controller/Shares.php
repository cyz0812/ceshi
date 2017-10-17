<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 11:23
 *
 * 股票配资
 */

namespace app\agent\controller;

use app\login\controller\Base;

class Shares extends Base{

    public function shares(){
        $shares=Db('shares');
        $user=Db('user');
        if(!empty(input('type'))){
            $good   =   $shares->where("type",input('type'))->find();
        }else{
            $good   =   $shares->where("type",'shares')->find();
        }
             $goods =   $shares->where('state=1')->select();

        if(session('username')){
            $map['phone']   =   session('username');
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
