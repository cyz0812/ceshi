<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 8:39
 *
 * 内容管理的交易规则
 */
namespace app\info\controller;

use app\base\controller\Base;

use app\info\model\Rule as InfoModel;

class Rule extends Base{
//    交易规则数据遍历和软删除
    public function yt_rule(){
        if (!empty(input('delete'))) {
            $path_file = InfoModel::path();
            $del_file = substr($path_file, strpos($path_file, 'download'));
            $row = InfoModel::del();
            if ($row) {
                $this->success('删除成功！', 'yt_rule');
            } else {
                $this->error('删除失败！请重新删除', 'yt_rule');
            }
        } else {
            $rules = InfoModel::rules();
            $this->assign('rules', $rules);
            echo $this->fetch();
        }
    }


//    修改交易规则
    public function update_rule(){
        if (!empty(input('id'))) {
            $info = InfoModel::info();
            $this->assign('info', $info);
            echo $this->fetch();
        } else if (!empty(input('update'))) {
            $file = request()->file('file');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/download/rule/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/download/rule/' . $filep;
                    $d['f_file'] = $filepath;
                    $data['path'] = $d['f_file'];
                } else {
                    echo $file->getError();
                }
            }
            if(input('update')==1){
                $data['type'] = 'a_rule';
            }else if(input('update')==2){
                $data['type'] = 'd_rule';
            }else if(input('update')==3){
                $data['type'] = 'a_tutorial';
            }else{
                $data['type']='d_tutorial';
            }
            $data['date'] = date("Y-m-d H:i:s ",time());
            $data['name'] = input('name');
            $row = InfoModel::load($data);
            $id = input('update');
            if ($row !== false) {
                $this->success('修改成功！', 'yt_rule');
            } else {
                $this->error('修改失败！请重新修改...！', "/Info/Rule/update_rule/id/.$id");
            }
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
}
