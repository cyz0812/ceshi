<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 上午 8:46
 *
 * 内容管理的帮助中心
 */

namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\Help as CenterModel;

class Help extends Base{
//    帮助中心的数据遍历和软删除
    public function yt_help(){
        if(!empty(input('delete'))){
            $row = CenterModel::row();
            if($row){
                $this->success('删除成功！','yt_help');
            }else{
                $this->error('删除失败！请重新删除','yt_help');
            }
        }else{
            $help_1 =   CenterModel::help_1();
            $help_2 =   CenterModel::help_2();
            $help_3 =   CenterModel::help_3();
            $this->assign('help_1',$help_1);
            $this->assign('help_2',$help_2);
            $this->assign('help_3',$help_3);
            echo $this->fetch();
        }
    }


//    修改帮助中心的信息
    public function update_help(){
        if(!empty(input('id'))){
            $info = CenterModel::info();
            $this->assign('info',$info);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $id = input('update');

            $data['date']       =   time();
            $data['title']      =   input('title');
            $data['content']    =   input('content');
            $data['par_num']    =   input('par_num');
            $data['serial']     =    input('serial');

            $data['date']   =   time();
            $data['title']  =   input('title');
            $data['content']=   input('content');
            $data['par_num']=   input('par_num');
            $data['serial']=    input('serial');

            $row=CenterModel::saves($data);
            if($row !== false){
                $this->success('修改成功！','yt_help');
            }else{
                $this->error('修改失败！请重新修改...',"/yt_help/id/$id");

            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    增加帮助中心的信息
    public function add_help(){
        if(empty(input('post.'))){
           echo $this->fetch();
        }else{
            $serial=CenterModel::serial();
            $data['par_num']    =   input('par_num');
            $data['title']      =   input('title');
            $data['content']    =   input('content');
           $data['serial']      =   $serial[0]['serial']+1;
            $data['date']       =   time();
            $row                 =  CenterModel::add($data);
            if($row){
                $this->success('添加成功！','yt_help');
            }else{
                $this->error('添加失败！请重新添加...',"/add_help/id/$id");
            }
        }

    }
}