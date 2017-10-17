<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 下午 4:14
 */

namespace app\website\model;
use think\Model;

class Deposit extends Model{
    public static function show($map){
       return Db('capital')->where($map)->order('replytime desc')->paginate(30);
    }
    public static function deposit(){
        return Db('capital')->where('id',input('id'))->find();
    }
}