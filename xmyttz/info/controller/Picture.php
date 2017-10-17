<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 10:17
 *
 * 内容管理的图片管理
 */

namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\Picture as PhotoModel;

class Picture extends Base{
//    图片管理数据遍历和软删除
    public function yt_picture(){
        if(!empty(input('delete'))){
            $img_file   =   PhotoModel::img();
            $del_file   =   substr($img_file,strpos($img_file,'Public'));
            $row        =   PhotoModel::row();
            if($row){
               $this->success('删除成功！','yt_picture');
            }else{
                $this->error('删除失败！请重新删除！','yt_picture');
            }
        }else{
            $pictures = PhotoModel::pictures();
            $this->assign('pictures',$pictures);
           echo  $this->fetch();
        }
    }


//    修改图片和地址
    public function update_picture(){
        if(!empty(input('id'))){
            $info = PhotoModel::info();
            $this->assign('info',$info);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $file = request()->file('img');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/img/picture/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a              =   $info->getSaveName();
                    $filep          =   str_replace("\\", "/", $a);
                    $filepath       =   '/Public/img/picture/' . $filep;
                    $d['f_file']    =   $filepath;
                    $data['path']   =   $d['f_file'];
                } else {
                    echo $file->getError();
                }
            }
            $data['index_show'] =   input('index_show');
            $data['serial']     =   input('serial');
            $data['date']       =   date("Y-m-d H:i:s", time());
            $data['name']       =   input('name');
            $row                =   PhotoModel::load($data);
            $id                 =   input('update');
            if ($row !== false) {
                $this->success('修改成功！', 'yt_picture');
            } else {
                $this->error('修改失败！请重新修改...！', "/Info/Picture/update_picture/id/.$id");
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    增加新的图片
    public function add_picture(){
        $data['index_show'] = input('index_show');
        if(!empty(input()) && !empty(input('name')) && !empty($_FILES)){
            if(empty(input('index_show'))){
                $data['index_show']=0;
            }
            if(!is_numeric(input('serial'))){
                $serial = PhotoModel::serial();
                $data['serial']=$serial+1;
            }
            $file = request()->file('img');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/img/picture/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a              = $info->getSaveName();
                    $filep          = str_replace("\\", "/", $a);
                    $filepath       = '/Public/img/picture/' . $filep;
                    $d['f_file']    = $filepath;
                    $data['path']   = $d['f_file'];
                } else {
                    echo $file->getError();
                }
            }
            $data['name'] = input('name'); $data['date']=date("Y-m-d H:i:s", time());
            $row  = PhotoModel::loads($data);
            if ($row !== false) {
                $this->success('添加成功！', 'yt_picture');
            } else {
                $this->error('添加失败！请重新添加...！', 'yt_picture');
            }
        }
        else{
            echo $this -> fetch();
        }
    }
}