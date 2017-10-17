<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23 0023
 * Time: 下午 7:29
 *
 * 移动端产品介绍
 */

namespace app\agent\controller;

use app\login\controller\Base;

class Goods extends Base{
    public function goods(){
        $help=Db('help');
		
		  $goods=Db('aqihuo')->where('del=0')->where('state=1')->select();
        $help_c2=$help->where('par_num=2')->order('serial')->select();
        $this->assign('help_c2',$goods);
        if(!empty(input('id'))){
            $help_act=Db('aqihuo')->where('id',input('id'))->find();
			dump(help_act);
            $this->assign('title',$help_act['type_name']);
            $this->assign('content',html_entity_decode($help_act['content']));
            $this->assign('active',$help_act['id']);
		}else{
              $help_act=Db('aqihuo')->where('del=0')->where('state=1')->find();
            $this->assign('title',$help_act['type_name']);
            $this->assign('content',$help_act['content']);
            $this->assign('active',$help_act['id']);

        }
		
		
        echo $this->fetch();
    }
}