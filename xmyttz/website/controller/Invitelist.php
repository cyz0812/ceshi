<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 4:30
 *
 * 网址开户链接：进行删除、增加和修改网址开户的信息
 */

namespace app\website\controller;

use think\controller;

use app\website\model\Invitelist as InviteModel;

use app\base\controller\Base;


class Invitelist extends Base{
//    显示网址开户的所有信息和删除操作
    public function yt_invitelist(){
        $input   = input('');

            $invite =   InviteModel::lists();
            $page=$invite->render();
            $this->assign('invite',$invite);
            $this->assign('page',$page);
            echo $this->fetch();

        if(!empty($input['condition'])){

            if($input['condition']=='invite_code'){
                $map[$input['condition']] = $input['value'];
            }elseif($input['condition']=='invite_name'){
                $map[$input['condition']] = array('like','%'.$input['value']);
            }elseif($input['condition']=='account_font'){
                $map[$input['condition']] = array('like',$input['value'].'%');
            }
            elseif($input['condition']=='fee'){
                $map[$input['condition']] = array('like',$input['value'].'%');
            }
            elseif($input['condition']=='phone'){
                $map[$input['condition']] = array('like',$input['value'].'%');
            }elseif($input['condition']=='password'){
                $map[$input['condition']] = array('like',$input['value'].'%');
            }elseif($input['condition']=='-1'){
                $map['del'] = '0';

            }
            $map['del'] = '0';
            $invite = Db('invitelist')->where($map)->order('invite_code')->paginate(10);
            $this->assign('invite',$invite);
            $page    = $invite->render();
            $this->assign('page',$page);
            return $this->fetch();
        }
        if(!empty(input('delete'))){
            $row = InviteModel::dellist(input('delete'));
            if($row){
                $this->success('删除成功','yt_invitelist');
            }else{
                $this->success('删除失败！请重新删除...','yt_invitelist');
            }
        }

    }
    public function add_data(){
        if (!empty(input(''))) {
            $data = input('');
            $row = InviteModel::addData($data);
            if ($row) {
                $arr['flag']=1;
            }
            else {
                $arr['flag']=0;
            }
            return json($arr);
        }
    }

//    修改网址开户的信息
    public function update_inviter(){
        $id = input('id');
        if(!empty($id)){
            $inviter  =  InviteModel::search($id);
            $this->assign('inviter',$inviter);
           return $this->fetch();
        }else if(!empty(input('update'))){
            $post = input('post.');
            $row = InviteModel::savelist(input('update'),$post);
            if($row !== false){
                $this->success('修改成功','yt_invitelist');
            }else{
                $this->error('修改失败，请重新修改。。。。','update_inviter/id/"."'.$id."'");
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


    public function judge_logo(){
        if($_POST['logo']==1){
            $display = 1;
        }elseif($_POST['logo']==0){
            $display = 0;
        }
        $id=input('id');
            $data['logo']= $display;
        $row= InviteModel::savelist(input('id'),$data);
        if($row===false){
            $arr['flag']=0;
        }else{
            $arr['flag']=1;
        }
        return json($arr);

    }
    public function judge_logo_one(){
        if($_POST['logo_one']==1){
            $display = 1;

        }elseif($_POST['logo_one']==0){
            $display = 0;
        }
        $id=input('id');
        $data['logo_one']=$display;

        $row= InviteModel::savelist(input('id'),$data);
        if($row===false){
            $arr['flag']=0;
        }else{
            $arr['flag']=1;
        }
        return json($arr);

    }

    public function add_invitelist(){
        echo $this->fetch();
    }
    public function has_invite_code(){
        $row=Db('invitelist')->where('invite_code',input('invite_code'))->find();
        if($row){
            $arr['flag']=1;
        }else{
            $arr['flag']=0;
        }
            return json($arr);
    }
}