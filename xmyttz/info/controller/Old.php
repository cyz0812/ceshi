<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 上午 10:16
 *
 * 内容管理的软件下载
 */

namespace app\info\controller;

use app\base\controller\Base;



class Old extends Base{
//    软件下载数据遍历和删除
    public function yt_old(){
        if(!empty(input('delete'))){

            $row    =  Db('old')->where('id',input('delete'))->update(['del'=>1]);
            if($row){
               $this->success('删除成功！','yt_old');
            }else{
                $this->error('删除失败！请重新删除','yt_old');
            }
        }else{
            $download    =   Db('old')->where('del',0)->select();
            $this->assign('download',$download);
            echo $this->fetch();
        }
    }

    public function add_old(){

        $download=Db('old');
        if(!empty($_POST)){
            $_POST['date']= date('Y-m-d h-i-s',time());
            $data=$_POST;
            $row=$download->strict(false)->insert($data);
            if($row){
                getAlert('添加成功！！','yt_old');

            }else{
                getAlert('添加失败！！','yt_old');
            }
        }else{
            echo $this -> fetch();
        }


    }

    public function update_old(){

        $download=Db('old');
        if(!empty(input('id'))){
            $info=$download->strict(false)->find(input('id'));
            $this->assign('info',$info);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $id=input('update');
            $data=input('');
            $row=$download->where('id',input('update'))->strict(false)->update($data);
            if($row !== false){
                getAlert('修改成功！','/info/old/yt_old');

            }else{
                getAlert('修改失败！请重新修改...！',"/info/old/update_old/id/".$id);

            }
        }else{
            echo "<center><img src='".__ROOT__."/Public/img/404.gif'></center>";
        }

    }
}