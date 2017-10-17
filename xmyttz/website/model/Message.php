<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 1:47
 *
 * 消息管理和消息发送所需的数据库犯方法
 */

namespace app\website\model;

use think\Model;


class Message extends  Model{

//消息发送获取所有客户姓名
    public function message($userid){
        $res    =   db('user')->where('id',$userid)->value('username');
        return $res;
    }

//查询所有客户
    public function lists(){
        $res    =   db('user')->select();
        return $res;
    }

//    添加消息
    public function addMessage($data){
        $res    =   db('message')->insert($data);
        return $res;
    }

//    查询所有信息
    public function allMessage($map){
        $res    =   db('message')->where($map)->where(array('del'=>0))->paginate(10);
        return $res;
    }


    public function message_row(){
        return Db('message')->find(input('id'));
    }
    public function user($message_row){
        $user_now   =   Db('user')->find($message_row['userid']);
        return $user_now;
    }
    public function row($delete){
        $row    =   Db('message')->strict(false)->where('id',$delete)->setField('del',1);
        return $row;
    }
    public function mess($ids){
        $message    =   Db('message')->where(array('id'=>array('in',$ids)))->setField('del',1);
        return $message;
    }

}