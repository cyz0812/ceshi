<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 下午 1:43
 */

namespace app\Help\Controller;
use app\Help\Model\Help as HelpModel;
use think\Controller;
class Help extends Controller{
    public function help(){
        $help=Db('help');
        if(!empty(input('id'))){
            $help_act=$help->where('id',input('id'))->find();
            $this->assign('title',$help_act['title']);
            $this->assign('content',html_entity_decode($help_act['content']));
            $this->assign('id',$help_act['id']);
            $this->assign('par',$help_act['par_num']);
        }else{
            $help_act=$help->where('id',1)->find();
            $this->assign('title',$help_act['title']);
            $this->assign('content',html_entity_decode($help_act['content']));
            $this->assign('id',$help_act['id']);
            $this->assign('par',$help_act['par_num']);
        }
        $help_c1=$help->where('del',0)->where('par_num=1')->order('serial')->select();
        $help_c3=$help->where('del',0)->where('par_num=3')->order('serial')->select();
        $help_c2=$help->where('del',0)->where('par_num=2')->order('serial')->select();
        $this->assign('help_c1',$help_c1);
        $this->assign('help_c2',$help_c2);
        $this->assign('help_c3',$help_c3);

        echo $this->fetch();
    }
}