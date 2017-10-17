<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 10:46
 */

namespace app\picture\controller;

use app\login\controller\Base;

class Picture extends Base{
    public function picture(){
        $picture    =   Db('picture');
        $pictures=$picture->order('date desc')->paginate(10);
        $show=$pictures->render();
        $this->assign('pictures',$pictures);
        $this->assign('page',$show);
        echo $this->fetch();

    }
}