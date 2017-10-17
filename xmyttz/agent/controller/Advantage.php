<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23 0023
 * Time: 下午 7:37
 */

namespace app\agent\controller;

use app\login\controller\Base;

class Advantage extends Base{
    public function advantage(){
        echo $this->fetch();
    }
}