<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 10:18
 *
 * 盈透前台——关于我们
 */

namespace app\about\controller;

use app\login\controller\Base;

class About extends Base{

//关于我们
    public function about(){

        $about  =   Db('about');
        $about_list =   $about->where('del',0)->order('serial')->select();
        $this->assign('about_list',$about_list);
        if(!empty(input('id'))){
            $about_act  =   $about->where('id',input('id'))->find();
            $this->assign('title',$about_act['title']);
            $this->assign('content',html_entity_decode($about_act['content']));
            $this->assign('active',$about_act['id']);
        }else{
            $about_act  =   $about->order('serial')->find();
            $this->assign('title',$about_act['title']);
            $this->assign('content',html_entity_decode($about_act['content']));
            $this->assign('active',$about_act['id']);

        }

        echo $this->fetch();
    }

//    移动端关于我们
    public function aboutList(){
        $about=Db('about');
        $about_list=$about->order('serial')->select();
        $this->assign('about_list',$about_list);
       echo  $this->fetch();
    }
}