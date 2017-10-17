<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 1:52
 *
 * 国内期货管理
 */

namespace app\contract\controller;

use app\contract\model\Dqihuo as DqihuoModle;

use think\File;

use app\base\controller\Base;

class Dqihuo extends Base{
//    国内期货数据遍历和删除
    public function yt_dqihuo(){
        if(!empty(input('delete'))){
            $img_file   =   DqihuoModle::img();
            $del_file   =   substr($img_file,strpos($img_file,'Public'));
            $row        =   DqihuoModle::row();
            if($row){

                $this->success('删除成功！','yt_dqihuo');
            }else{
                $this->error('删除失败！请重新删除','yt_dqihuo');
            }
        }else{
            $goods  =   DqihuoModle::goods();
            $this->assign('goods',$goods);
            echo $this->fetch();
        }
    }


//    修改国内期货的数据信息
    public function update_dqihuo(){

        if (!empty(input('id'))) {
            $info =  DqihuoModle::info();
            $this->assign('info', $info);
            echo $this->fetch();
        } else if (!empty(input('update'))) {
            $id = input('update');
            $data = input();
            $row =DqihuoModle::load($data);
            if ($row !== false) {
                $this->success('修改成功！', 'yt_dqihuo');
            } else {
                $this->success('修改失败！请重新修改...！', '/update_dqihuo/id/' . $id . '');
            }
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }



//    国内期货的显示与隐藏
    public function dqihuo_show_hide(){
        if(input('state') == 1){
            $data['state'] = 0;
        }elseif(input('state') == 0){
            $data['state'] = 1;
        }
        $row=DqihuoModle::load($data);
        if($row === false){
            $arr['flag'] = 0;
        }else{
            $arr['flag'] = 1;
        }
       return json($arr);
    }

//    增加国内期货的数据
    public function add_dqihuo(){
     if (!empty(input('post.'))) {
            $data = input();
            $data['date'] = time();
            $row = DqihuoModle::add($data);
            if ($row) {
                $this->success('添加成功', 'yt_dqihuo');
            } else {
                $this->error('添加失败！请重新添加...', 'add_dqihuo');
            }
        } else {
            echo $this->fetch();
        }
    }
    public function is_num(){
        $arr['flag'] = 1;
        $num = DqihuoModle::num();
        foreach ($num as $v){
            if(input('num')==$v['num']){
                $arr['flag']=0;
            }
        }
        Return json($arr);
    }

}
