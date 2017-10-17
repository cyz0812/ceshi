<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 2:39
 */

namespace app\xinguanjia\model;

use think\Model;

class Agent extends Model{
    public function agent($id){
        $row=db('agent')->where('id',$id)->setField('del',1);
        return $row;
    }
    public function addData($data){
        $row=db('agent')->insert($data);
        return $row;
    }
    public function lists(){
        $agents=db('agent')->order('id')->where(array('del'=>0))->select();
        return $agents;
    }
    
    //获取agent列表
    public static function getselect($map){
    	return Db('agent')->where('del',0)->where($map)->select();
    }
}