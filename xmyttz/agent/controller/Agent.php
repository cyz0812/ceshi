<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 上午 10:11
 *
 * 代理登录模块
 */

namespace app\agent\Controller;

use think\Controller;

use app\agent\model\Agent as AgentModel;

class Agent extends Controller{
//    空操作
    public function _empty(){
       getAlert(null,'/agent/agent/agentlogin');
    }


//    代理商登入判断
    public function agentlogin(){
        if(!empty(input())){
            $map['invite_code'] =   input('agent');
            $map['password']    =   input('password');
            $agnet              =   AgentModel::agent($map);
            if(!!$agnet){
                session('agent',input('agent'));
                getAlert(null,'agentmanage');
            }else{
                getAlert('用户名或密码错误！','agentlogin');
            }
        }else{
            echo $this->fetch();
        }
    }


//    退出登录，并且销毁用户信息
    public function agentlogout(){
        session('agent',null);
        header('Location:agentlogin');
        exit(0);
    }


//    判断是否已经登录
    public function is_agent(){
        $map['invite_code']=session('agent');
        $agnet= AgentModel::agent($map);
        if(!!$agnet){
            return $agnet;
        }else{
            return false;
        }
    }


//    主界面
    public function agentmanage(){
        if($agent=$this->is_agent()){
            echo $this->fetch();
        }else{
            getAlert('请先登录！','agentlogin');

        }
    }


//    左边列表
    public function left(){
        if(session('agent')){
            echo $this->fetch();
        }
    }


//    右边详细信息
    public function right(){
        if($agent = $this->is_agent()){
        	
            $userlist = AgentModel::right($agent);
            $this->assign('userlist',$userlist);
           echo  $this->fetch();
        }
    }


//    代理详细信息
    public function detail_userinfo(){
        if($agent = $this->is_agent()){
            if(!empty(input('id'))){
                $userinfo = AgentModel::userinfo($agent);
                if(!empty($userinfo)){
                    $this->assign('userinfo',$userinfo);
                   echo  $this->fetch();
                }else{
                    echo "<center><img src='/Public/img/404.gif'></center>";
                }
            }else if(!empty(input('update'))){
                $userinfo=AgentModel::update_user($agent);
                if(!empty($userinfo)){
                    $id=input('update');
                    $data=input('');
                    $row=AgentModel::row($data);
                    if($row !== false){
                        $this->success('修改成功！','right');
                    }else{
                        $this->error('修改失败！请重新修改...！',"detail_userinfo/id/$id");
                    }
                }else{
                    echo "<center><img src='/Public/img/404.gif'></center>";
                }
            }else{
                echo "<center><img src='/Public/img/404.gif'></center>";
            }
        }
    }


//    文件下载
    public function ag_file(){
        $file=Db('file');
        if($agent=$this->is_agent()){
            $map[]=['EXP',"FIND_IN_SET('".$agent['id']."',sendee)"];
            $files=$file->where($map)->select();
            $this->assign('files',$files);
            $this->assign('agent',$agent);
            echo $this->fetch();
        }
    }


    public function loaded(){
        $file=Db('file');
        if($agent=$this->is_agent()){
            if(!empty($_POST['file_id'])){
                $map['id']=$_POST['file_id'];
                $old_loaded=$file->where($map)->value('downloaded');
                $data['downloaded']=$old_loaded.$agent['id'].',';

                $load=AgentModel::load($map,$agent,$data);
                if( $load!==false){
                    $arr['flag']=1;
                }else{
                    $arr['flag']=0;
                }
               return json($arr);
            }
        }
    }

//    代理申请
    public function submission(){
        $submission=Db('submission');
        if(!empty(input('commission'))){
            $data['senttime']=date('Y-m-d H:i:s');
            $data['state']=0;
            $data['user']=input('user');
            $data['type']=input('type');
            $data['commission']=input('commission');
            $data['overnight']=input('overnight');
            $data['agent']=input('agent');
            $row=$submission->insert($data);
            if(!!$row){
                $this->success('提交成功','submission');
            }else{
                $this->error('提交失败，请重新提交或联系客服','submission');
            }
        }else{
           echo  $this->fetch();
        }
    }
}