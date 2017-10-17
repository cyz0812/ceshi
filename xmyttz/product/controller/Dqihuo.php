<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23 0023
 * Time: 上午 11:20
 *
 *
 * 国内期货
 */

namespace app\product\controller;

use app\login\controller\Base;

class Dqihuo extends Base{


    public function dqihuo(){

        $dqihuo =   Db('dqihuo');
        $user   =   Db('user');
        if(!empty(input('type'))){
            $good=$dqihuo->where("type",input('type'))->find();
        }else{
            $good=$dqihuo->where("type",'dqihuo')->find();
        }
        $goods=$dqihuo->where('state=1')->select();
        if(session('?phone')){
            $map['phone']=session('phone');
            $user_row=Db('user')->where($map)->find();
            $this->assign('balance',$user_row['balance']);
            $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
            $this->assign('login_state',1);
            $this->assign('account',$user_row['username']);
            $this->assign('user',$user_row);
        }else{

            $user_row=Db('user')->find();
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


//    国内期货付款
    public function dqihuoPay(){
        $user=Db('user');

        if($phone_user=$this->loginUser('/login/login/login')){
            if(empty($phone_user['card'])){
                cookie('addcardPath','dqihuoPay');
                echo "<script>location.href='/personal/userinfo/addcard'</script>";
            }
            $zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
            $weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
            $this->assign('zhifubao',$zhifubao);
            $this->assign('weixin',$weixin);
            $this->assign('user',$phone_user);
            $this->assign('out_orderid','YRJ'.date("ymdHis").rand(1000,9999));
            echo $this->fetch();
        }
    }

}
