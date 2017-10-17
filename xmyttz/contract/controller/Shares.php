<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 6:15
 *
 * 国内股票管理
 */

namespace app\contract\controller;

use app\contract\model\Shares as  SharesModel;

use app\base\controller\Base;

class Shares extends Base{
    //国内股票删除和遍历
    public function yt_shares(){
        if(!empty(input('delete'))){
            $row = SharesModel::row();
            if($row){
                $this->success('删除成功！','yt_shares');
            }else{
                $this->error('删除失败！请重新删除！','yt_shares');
            }
        }else{
            $goods = SharesModel::goods();
            $this->assign('goods',$goods);
            echo $this->fetch();
        }
    }

//    国内股票显示和隐藏
    public function shares_show_hide(){
        if(input('state') == 1){
            $data['state'] = 0;
        }elseif(input('state') == 0){
            $data['state'] = 1;
        }
        $row=SharesModel::state($data);
        if($row === false){
            $arr['flag'] = 0;
        }else{
            $arr['flag'] = 1;
        }
       return json($arr);
    }

//    增加国内股票
    public function add_shares(){
        if(empty(input())){
            echo $this->fetch();
        }else{
            $data=input();
            $data['state'] =1;
            $data['date'] =time();
            $row = SharesModel::add($data);
            if($row){
                $this->success('添加成功','yt_shares');
            }else{
                $this->error('添加失败！请重新添加...','add_shares');

            }
        }
    }

//    修改国内股票信息
    public function update_shares(){
        if(!empty(input('id'))){
            $info = SharesModel::info();
            $this->assign('info',$info);
           echo  $this->fetch();
        }else if(!empty(input('update'))){
            $id = input('update');
            $date = input('date');
            $date =time();
            $row = SharesModel::up();
            if($row === false){
                $this->error('修改失败！请重新修改...',"/yt_shares/id/.$id");
            }else{
                $this->success('修改成功！',"yt_shares");
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
    public function is_num(){
        $arr['flag'] = 1;
        $num = SharesModel::num();
        foreach ($num as $v){
            if(input('num') == $v['num']){
                $arr['flag'] = 0;
            }
        }
        Return json($arr);
    }
}