<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 下午 5:18
 */

namespace app\website\model;
use think\Model;

class Withdraw extends Model{
    public static function show($map){
        return Db('capital')->where($map)->order('replytime desc')->paginate(30);
    }
    public static function withdraw(){
        return Db('capital')->where('id',input('id'))->find();
    }
}