<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 9:11
 *
 * 内容管理的首页图片
 */

namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\Bg as HomepageModel;

class Bg extends Base{
//首页图片的遍历和删除
    public function yt_bg() {
        if(!empty(input('delete'))){
            $img_file   =   HomepageModel::img();
            $del_file   =   substr($img_file,strpos($img_file,'Public'));
            $row        =   HomepageModel::row();
            if($row){
                $this->success('删除成功','yt_bg');
            }else{
               $this->error('删除失败，请重新删除....'.'yt_bg');
            }
        }else{
            $bg         =   HomepageModel::bg();
            $this->assign('bg',$bg);
            echo $this->fetch();
        }
    }


//    修改首页图片的数据
    public function update_bg(){
        if(!empty(input('id'))){
            $info   =   HomepageModel::info();
            $this->assign('info',$info);
           echo  $this->fetch();
        }else if(!empty(input('update'))){
            $file = request()->file('img');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/img/banner/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/img/banner/' . $filep;
                    $d['f_img'] = $filepath;
                    $data['img'] = $d['f_img'];
                } else {
                    echo $file->getError();
                }

            }
       		if(!is_numeric(input('num'))){
                $num = HomepageModel::num();
                $data['num'] = $num+1;
            }
            $data['date'] = time();
            $data['name'] = input('name');
            $row = HomepageModel::load($data);
            $id  = input('update');
            if ($row !== false) {
                $this->success('修改成功！', 'yt_bg');
            } else {
                $this->error('修改失败！请重新修改...！', "/Info/Bg/update_bg/id/.$id");
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    增加首页图片数据
    public function add_bg(){
        if(!empty(input()) && !empty(input('name')) && !empty($_FILES)){
            if(!is_numeric(input('num'))){
                $num = HomepageModel::num();
                $data['num'] = $num+1;
            }
            $file = request()->file('img');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/img/banner/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/img/banner/' . $filep;
                    $d['f_img'] = $filepath;
                    $data['img'] = $d['f_img'];
                } else {
                    echo $file->getError();
                }
            }
            $data['date'] = time();
            $data['name'] = input('name');
            $row = HomepageModel::add($data);
            if ($row !== false) {
                $this->success('添加成功！', 'yt_bg');
            } else {
                $this->error('添加失败！请重新添加...！', "add_bg");
            }
        }else{
           echo  $this -> fetch();
        }
    }
    public function is_num(){
        $arr['flag']=1;
        $num=HomepageModel::number();
        foreach ($num as $v){
            if(input('num')==$v['num']){
                $arr['flag']=0;
            }
        }
        return json($arr);
    }

}