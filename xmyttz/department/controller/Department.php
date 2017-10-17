<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 9:53
 */

namespace app\department\controller;

use app\login\controller\Base;

class Department extends Base{
    public function department(){
        echo $this->fetch();
    }
}