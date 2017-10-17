<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 1:02
 *
 * 国际期货管理
 */
namespace app\contract\controller;

use app\contract\model\Aqihuo as AhuoModel;

use app\base\controller\Base;

class Aqihuo extends Base
{

//国际期货遍历和删除
    public function yt_aqihuo()
    {
        if (!empty(input('delete'))) {
            $row = AhuoModel::deletes();
            if ($row) {
                $this->success('删除成功！', 'yt_aqihuo');
            } else {
                $this->error('删除失败！请重新删除！', 'yt_aqihuo');
            }
        } else {
            $goods = AhuoModel::lists();
            $this->assign('goods', $goods);
            echo $this->fetch();
        }
    }

//    修改国际期货的信息
    public function update_aqihuo(){

        if (!empty(input('id'))) {
            $info = AhuoModel::finds();
            $this->assign('info', $info);
            echo $this->fetch();
        } else if (!empty(input('update'))) {
            $id = input('update');
            $aqihuo=db('aqihuo');
            $path=$aqihuo->where('id',input('update'))->value('img');
            if(!empty($_FILES['img']['tmp_name'])){
                $file = request()->file('img');
                $info = $file->move(ROOT_PATH .'public'. DS . 'Public/img/aqihuo/');
                if (!$info) {
                    // 上传错误提示错误信息
                   echo $file->getError();
                } else {
                    //上传成功 获取上传文件信息
                    $img_path= $info->getSaveName();
                    $path = '/Public/img/aqihuo/' . $img_path;
                }
                $data['img']=$path;
            }else{
                $data['img']=$path;
            }
                $data['type']=$_POST['type'];
                $data['type_name']=$_POST['type_name'];
                $data['content']=$_POST['content'];
                $data['state']=1;
                $row = AhuoModel::saves($data);
            if ($row !== false) {
                $this->success('修改成功！', 'yt_aqihuo');
            } else {
                $this->success('修改失败！请重新修改...！', '/update_aqihuo/id/' . $id . '');
            }
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }

//    增加国际期货数据
    public function add_aqihuo(){
        if (!empty(input('post.'))) {
            $data = input();
            $data['date'] = time();
            $file = request()->file('img');
            $info = $file->move(ROOT_PATH .'public'. DS . 'Public/img/aqihuo/');
            if (!$info) {
                // 上传错误提示错误信息
                echo $file->getError();
            } else {
                //上传成功 获取上传文件信息
                $img_path= $info->getSaveName();
                $path = '/Public/img/aqihuo/' . $img_path;
            }
            $data['img']=$path;
            $data['type']=$_POST['type'];
            $data['type_name']=$_POST['type_name'];
            $data['content']=$_POST['content'];
            $data['state']=1;
            $row = AhuoModel::add($data);
            if ($row) {
                $this->success('添加成功', 'yt_aqihuo');
            } else {
                $this->error('添加失败！请重新添加...', 'add_aqihuo');
            }
        }
        else {
            echo $this->fetch();
        }

    }


//    国际期货某条数据是否显示或掩藏
    public function aqihuo_show_hide()
    {

        if (input('state') == 1) {
            $data['state'] = 0;
        } elseif (input('state') == 0) {
            $data['state'] = 1;
        }
        $row = AhuoModel::row($data);
        if ($row === false) {
            $arr['flag'] = 0;
        } else {
            $arr['flag'] = 1;

            if (input('state') == 1) {
                $data['state'] = 0;
            } elseif (input('state') == 0) {
                $data['state'] = 1;
            }
            $row = AhuoModel::row($data);
            if ($row === false) {
                $arr['flag'] = 0;
            } else {
                $arr['flag'] = 1;
            }
            return json($arr);
        }
    }
}