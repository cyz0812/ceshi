<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/24 0024
 * Time: 上午 10:59
 *
 * 个人中心
 */

namespace app\agent\controller;
use app\login\controller\Base;
use app\info\model\Rule;
use app\info\model\Record;
use app\website\model\User as UserModel;
use think\Session;
use think\Rsa;

class User extends Base {
    public function user(){
        $user = parent::loginUser('/agent/Login/login');
        $this->assign('user',$user);

        $a_rule     = Rule::getfield(array('type' => 'a_rule'),'path');
        $a_tutorial = Rule::getfield(array('type' => 'a_tutorial'),'path');
        $d_rule     = Rule::getfield(array('type' => 'd_rule'),'path');
        $d_tutorial = Rule::getfield(array('type' => 'd_tutorial'),'path');
        $this->assign('a_rule',$a_rule);
        $this->assign('a_tutorial',$a_tutorial);
        $this->assign('d_rule',$d_rule);
        $this->assign('d_tutorial',$d_tutorial);

        $map_record['body'] = $user['id'];
        $record = Record::getselect($map_record,8,'trans_time desc');
        $this->assign('user_record',$record);

        echo $this->fetch();
    }


//    下载文件
    public function file(){
        $file=Db('file');
        if( $phone=$this->loginuser('/Agent/login/login')){
            $id=$phone['id'];
            $map[]=['EXP',"FIND_IN_SET('".$id."',sendee)"];
            $files=$file->where($map)->select();
            $this->assign('files',$files);
            echo $this->fetch();
        }
    }

    public function files(){
        $file=Db('file');
        $files=$file->select();
            $this->assign('files',$files);
            echo $this->fetch();

    }


//    出入金记录
    public function record(){
        $record =   Db('record');
        session_start();
        $phone_user = parent::loginUser('/agent/Login/login');
        if(!empty($_SESSION['return'])){
            $this->assign('out_orderid','YRJ');
            $_SESSION['return'] =   NULL;
        }
        if(!empty($_SESSION['withdrawal'])){
            $this->assign('withdrawal','withdrawal');
            session('withdrawal',null);
        }
        $record_map['body']=$phone_user['id'];
        if(!empty(input('state')) && input('state') !=-1){
            if(input('state') == 1){
                $record_map['state']    =   '已支付';
            }elseif(input('state') == 0){
                $record_map['state']    =   '未支付';
            }
        }
        if(input('day') !=  -1){
            if(input('day')){
                $record_map['trans_time']   =   array('GT',date('Y-m-d H:i:s',strtotime('-'.input('day').' day')));
            }else{
                $record_map['trans_time']   =   array('GT',date('Y-m-d H:i:s',strtotime('-1 week')));
            }
        }
        if(!empty(input('market')) && input('market') !=-1){
            $record_map['type'] =   input('market');
        }
        if(!empty(input('recordtype')) && input('recordtype') !=-1){
            $record_map['method']   =   input('recordtype');

        }
        $user_record=$record->where($record_map)->order('trans_time','desc')->paginate(2,false,['query' => input('param.')]);
        $show   =   $user_record->render();
        $this->assign('balance',$phone_user['balance']);
        $this->assign('user_record',$user_record);
        $this->assign('page',$show);
        echo $this->fetch();

    }

    public function addcard() {
        $user = parent::loginUser('/agent/Login/login');
        $this->assign('user',$user);

        if(!empty($user['card'])){
            getAlert(null,'setcard');
            exit;
        }
        if(empty($_COOKIE['addcardPath'])){
            cookie('addcardPath','/agent/user/setcard');
        }
        echo $this->fetch();
    }
    //添加ajax处理
    public function addcard_success(){
        parent::loginUser('/agent/Login/login');
        if(!empty($_POST['card'])){
            $row = UserModel::getsave(array('phone' => session('phone')),$_POST);
            if($row){
                $arr['flag']=1;
            }else{
                $arr['flag']=0;
            }
            return json($arr);
        }
    }
    //银行卡信息显示
    public function setcard(){
        $user = parent::loginUser('/agent/Login/login');

        $card      = substr($user['card'], 0, 4).'***********'.substr($user['card'], 15);
        $cardphone = substr($user['cardphone'], 0, 3).'****'.substr($user['cardphone'], 7);
        $this->assign('card'      , $card);
        $this->assign('cardphone' , $cardphone);
        $this->assign('user'      , $user);
        echo $this->fetch();
    }

    public function old(){
        $old=Db('old')->where('del',0)->find();
        $this->assign('old',$old);
        return $this->fetch();
    }
    public function news(){
        $news=Db('new')->where('del',0)->find();
        $this->assign('news',$news);
        return $this->fetch();

    }

}