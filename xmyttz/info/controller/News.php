<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 9:40
 *
 * 内容管理的新闻管理
 */

namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\News as PressModel;

class News extends Base{
//    新闻管理的数据遍历和软删除
    public function yt_news(){
        if(!empty(input('delete'))){
            $row=PressModel::row();
            if($row){
                $this->success('删除成功！','yt_news');
            }else{
                $this->error('删除失败！请重新删除','yt_news');
            }
        }else{
            $article = PressModel::article();
            $this->assign('article',$article);
            echo $this->fetch();
        }
    }


//    修改新闻信息
    public function update_news(){
        if(!empty(input('id'))){
            $info = PressModel::info();
            $this->assign('info',$info);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $id = input('update');

            if( input('state')=='on'){
                $data['state']=1;
            }else{
                $data['state']=0;
            }
            if(!empty( $data['date'])){
                $data['date'] = strtotime( $data['date']);
            }else{
                $data['date'] = time();
            }
            $data['date']   =   time();
            $data['title']  =   input('title');
            $data['brief']  =   input('brief');
            $data['content']=   input('content');
            $row=PressModel::rows($data);
           if($row !== false){
              $this->success('修改成功！','yt_news');
            }else{
               $this->error('修改失败！请重新修改...',"/update_news/id/.$id");
           }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    添加新数据
    public function add_news(){
        if(empty(input())){
           echo $this->fetch();
        }else{
            if(!empty(input('state'))){
                $_POST['state'] = 1;
            }else{
                $_POST['state'] = 0;
            }
            if(!empty($_POST['date'])){
                $_POST['date'] = strtotime($_POST['date']);
            }else{
                $_POST['date'] = time();
            }
            $data         = input();
            $data['date'] = time();
            $row=PressModel::add($data);
            if($row){
                $this->success('添加成功！','yt_news');
            }else{
                $this->error('添加失败！请重新添加...','add_news');
            }
        }
    }
}