<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 下午 3:55
 */

namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\File as FileloadModel;

class File extends Base{

    public function yt_file(){
        if(!empty(input('delete'))){
            $path_file=FileloadModel::path();
            $del_file=substr($path_file,strpos($path_file,'download'));
            $row=FileloadModel::row();
            if($row){
                $this->success('删除成功！','yt_file');
            }else{
                $this->error('删除失败！请重新删除！','yt_file');
            }
        }else{
            $files=FileloadModel::files();
            $this->assign('files',$files);
            echo $this->fetch();
        }
    }


    public function update_file(){
        if(!empty(input('id'))){
            $info=FileloadModel::info();
            $this->assign('info',$info);
            $list=FileloadModel::lists();
            $this->assign('list',$list);
            $sendee=explode(',',$info['sendee']);
            $this->assign('sendee',$sendee);
            $load_id=explode(',',$info['downloaded']);
            foreach ($load_id as $v){
                $load_name=FileloadModel::names($v).'，';
            }
            $load_name=mb_substr($load_name,0,-1);
            $this->assign('load_name',$load_name);
            echo $this->fetch();
        }else if(!empty(input('update'))){
            $id=input('update');
            $path=FileloadModel::paths();
            $file = request()->file('file');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/download/file/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/download/file/' . $filep;
                    $d['f_file'] = $filepath;
                    $data['path'] = $d['f_file'];
                } else {
                    echo $file->getError();
                }

            }
            $data['num'] = input('num');
            $data['date'] = date("Y-m-d H-i-s",time());
            $data['name'] = input('name');
            $data['sendee']='';
            if(!empty($_POST['invite_id'])){
                foreach($_POST['invite_id'] as $invite_id){
                    $data['sendee'].=$invite_id.',';
                }
            }

            if(input('customer')=='y'){
                $data['sendee'].=$_POST['customer'];
            }else{
                $data['sendee'].='n';
            }
            $row=FileloadModel::up($data);
            if ($row !== false) {
                $this->success('修改成功！', 'yt_file');
            } else {
                $this->error('修改失败！请重新修改...！',"/Info/File/update_file/id/.$id");
            }

            foreach($_POST['invite_id'] as $invite_id){
                $_POST['sendee'].=$invite_id.',';
            }
            if($_POST['customer']=='y'){
                $_POST['sendee'].=$_POST['customer'];
            }else{
                $_POST['sendee'].='n';
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//
    public function add_file(){
        if(!empty(input('name')) && !empty($_FILES)){
            $file = request()->file('file');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/download/file/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/download/file/' . $filep;
                    $d['f_file'] = $filepath;
                    $data['path'] = $d['f_file'];
                } else {
                    echo $file->getError();
                }
            }
            $data['num'] = input('num');
            $data['date'] = date("Y-m-d H-i-s",time());
            $data['name'] = input('name');
            $data['sendee']='';
            if(!empty($_POST['invite_id'])){
	            foreach($_POST['invite_id'] as $invite_id){
	                $data['sendee'].=$invite_id.',';
	            }
            }
            if(!empty($_POST['customer']) && $_POST['customer']=='y'){
                $data['sendee'].=$_POST['customer'];
            }else{
                $data['sendee'].='n';
            }
            $row=FileloadModel::add($data);
            if ($row !== false) {
                $this->success('添加成功！', 'yt_file');
            } else {
                $this->error('添加失败！请重新添加...！',"add_file");
            }
        }
        else{
            $list=FileloadModel::lis();
            $this->assign('list',$list);
            echo $this -> fetch();
        }
    }
}