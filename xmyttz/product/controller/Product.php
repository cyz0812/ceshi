<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/9/1 0001
 * Time: 下午 4:13
 */

namespace app\product\controller;

use app\login\controller\Base;

class Product extends Base{
    public function product(){
        $aqihuo=Db('aqihuo');

//        if(!empty(input('type'))){
//            $product=$aqihuo->where("type",input('type'))->find();
//            $this->assign('product',$product);
//        }

        $goods=$aqihuo->where('del=0')->where('state=1')->select();
        $this->assign('goods',$goods);
        echo $this->fetch();
    }
}