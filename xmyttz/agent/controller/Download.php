<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 10:50
 */

namespace app\agent\controller;

use app\login\controller\Base;

class Download extends Base{
    public function download(){
        /* if(!empty($_SESSION['withdrawal'])){
            $this->assign('withdrawal','withdrawal');
            session('withdrawal',null);
        } */
		 $download=Db('download');
        $download_all=$download->where('del=0')->select();
        $this->assign('download_all',$download_all);
        $goods=$download->where('del=0')->limit(1)->find();
        if(!empty(input('id'))){
            $good=$download->where("id",input('id'))->find();
        }
        else{
            $good=$download->where(array("id"=> $goods['id'],'del'=>0))->find();
        }
        $this->assign('goods',$goods['id']);
        $this->assign('good',$good);
        /*$this->display();
        $download=Db('download');
        $download_pc=$download->where('area','computer')->select();
        $download_mt=$download->where('del',0)->where('area','phone')->select();
        $this->assign('download_pc',$download_pc);
        $this->assign('download_mt',$download_mt);*/
        echo $this->fetch();
    }
}