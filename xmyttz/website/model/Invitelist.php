<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 4:31
 *
 * 网站开户连接数据库查询方法
 */

namespace app\website\model;

use think\Model;

class Invitelist extends Model{

//    利用id和del字段进行软删除操作
    public static function dellist($id){
        return Db('invitelist')->where('id',$id)->setField('del',1);
    }

//    直接添加数据
    public static function addData($data){
        return Db('invitelist')->insert($data);
    }

//    查询全部数据,条件del为0
    public static function lists(){
        return Db('invitelist')->where('del',0)->order('invite_code')->paginate(10);
    }

//    查询id
    public static function search($id){
        return Db('invitelist')->find($id);
    }

//    在修改id相同的情况下，修改该客户的数据
    public static function savelist($id,$data){
        return Db('invitelist')->where('id',$id)->update($data);
    }

}