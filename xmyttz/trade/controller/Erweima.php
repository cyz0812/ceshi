<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/15 0015
 * Time: 下午 1:08
 *
 * 交易管理的转账二维码
 */

namespace app\trade\controller;

use app\base\controller\Base;
use app\trade\model\Erweima as TradeModel;

class Erweima extends Base{
//    二维码遍历
    public function yt_erweima()
    {
        if (!empty(input('delete'))) {
            $img_file   = TradeModel::img();
            $del_file   = substr($img_file, strpos($img_file, 'Public'));
            $row        = TradeModel::row();
            if ($row) {
                $this->success('删除成功！', 'yt_erweima');
            } else {
                $this->error('删除失败！请重新删除', 'yt_erweima');
            }
        } else {
            $zhifubao   = TradeModel::zfb();
            $weixin     = TradeModel::wx();
            $this->assign('zhifubao', $zhifubao);
            $this->assign('weixin', $weixin);
            echo $this->fetch();
        }
    }


//    修改二维码信息
    public function update_erweima()
    {
        if (!empty(input('id'))) {
            $info = TradeModel::info();
            $this->assign('info', $info);
            echo $this->fetch();
        } else if (!empty(input('update'))) {
            if (!empty($_FILES['img']['tmp_name'])) {
                $file = request()->file('img');
                if (isset($file)) {
                    $info = $file->move(ROOT_PATH . '/public/Public/img/erweima/');
                    if ($info) {
                        // 成功上传后 获取上传信息
                        $a              =   $info->getSaveName();
                        $filep          =   str_replace("\\", "/", $a);
                        $filepath       =   '/Public/img/erweima/' . $filep;
                        $d['f_img']     =   $filepath;
                        $data['img']    =   $d['f_img'];
                    } else {
                        echo $file->getError();
                    }
                }
                $data['type'] = input('type');
                $data['date'] = date("Y-m-d H:i:s",time());
                $data['name'] = input('name');
                $row = TradeModel::load($data);
                $id = input('update');
                if ($row !== false) {
                    $this->success('修改成功！', 'yt_erweima');
                } else {
                    $this->error('修改失败！请重新修改...！', "/Trade/Code/update_erweima/id/.$id");
                }
            } else {
                echo "<center><img src='/Public/img/404.gif'></center>";
            }
        }
    }

//设二维码显示状态
    public function erweima_show(){
        $data_default['state'] = 0;
        $row1 = TradeModel::state($data_default);
        $data['state'] = 1;
        $row2 = TradeModel::state_w($data);
        if( $row1=== false || $row2 === false){
            $arr['flag'] = 0;
        }else{
            $arr['flag'] = 1;
        }
        return json($arr);
    }


//    增加二维码
    public function add_erweima(){
        if(!empty(input('post.')) && !empty(input('name')) && !empty($_FILES)){
            $file = request()->file('img');
            if (isset($file)) {
                $info = $file->move(ROOT_PATH . '/public/Public/img/erweima/');
                if ($info) {
                    // 成功上传后 获取上传信息
                    $a = $info->getSaveName();
                    $filep = str_replace("\\", "/", $a);
                    $filepath = '/Public/img/erweima/' . $filep;
                    $d['f_img'] = $filepath;
                    $data['img'] = $d['f_img'];
                } else {
                    echo $file->getError();
                }
            }
            $data['type'] = input('type');
            $data['date'] = date("Y-m-d H:i:s",time());
            $data['name'] = input('name');
            $row = TradeModel::add($data);
            if ($row !== false) {
                $this->success('添加成功！', 'yt_erweima');
            } else {
                $this->error('添加失败！请重新添加...！', "add_erweima");
            }
            }

        else{
            echo $this -> fetch();
        }
    }
}