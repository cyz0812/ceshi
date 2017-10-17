<?php
namespace app\xinguanjia\model;
use think\Model;
class Xgjuser extends Model{
	
	protected $table = 'yt_xinguanjia';
	
	public static function del($id){
		return Db('xinguanjia')->where('id',$id)->setField('del',1);
	}
	public static function count($map){
		return Db('xinguanjia')->where($map)->where('del',0)->setField('del',1);
	}


}