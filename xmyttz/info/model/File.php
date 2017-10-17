<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 下午 3:56
 */

namespace app\info\model;
use think\Model;

class File extends Model
{
    public static function path(){
        return Db('file')->where('id', input('delete'))->value('path');
    }

    public static function row(){
        return Db('file')->where('id', input('delete'))->setField('del', 1);
    }
    public static function files(){
        return Db('file')->where('del',0)->select();
    }
    public static function info(){
        return Db('file')->find(input('id'));
    }
    public static function lists(){
        return Db('invitelist')->order('account_front')->select();
    }
    public static function names($v){
        return Db('invitelist')->where('id',$v)->value('invite_name');
    }
    public static function paths(){
        return Db('file')->where('id',input('update'))->value('path');
    }
    public static function up($data){
        return Db('file')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function add($data){
        return Db('file')->strict(false)->insert($data);
    }
    public static function lis(){
        return Db('invitelist')->order('account_front')->select();
    }
}