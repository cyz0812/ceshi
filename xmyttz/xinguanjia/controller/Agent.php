<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 2:39
 */

namespace app\xinguanjia\controller;
use app\base\controller\Base;

class Agent extends Base{
    public $note;
    public function _initialize(){
        parent::_initialize(); // TODO: Change the autogenerated stub
        $this->note=model('Agent');
    }

    //短信列表
    public function yt_agent(){
        if(!empty(input('delete'))){
            $id=input('delete');
            $row   =  Db('agent')->where('id',$id)->update(['del'=>1]);
            if($row){
                $this->success('删除成功','yt_agent');

            }else{
                echo "<script>alert('删除失败！请重新删除');history.go(-1)</script>";
            }
        }elseif(!empty(input())){
            $data=input();
            $row    =   $this->note->addData($data);
            if($row){
                echo "<script>location.href='./yt_agent'</script>";
            }else{
                echo "<script>alert('添加失败！请重新添加...');history.go(-1)</script>";
            }
        }else{
            $agents =   Db('agent')->where('del',0)->order('account_front')->select();
            $this->assign('agents',$agents);
            echo $this->fetch();
        }

    }
    public function agent_change(){
        $_POST=input('');
            if(!empty(input('id'))){

                $data['account_front']=$_POST['account'];
                $data['phone']=$_POST['invite_phone'];
                $row=Db('agent')->where('id',$_POST['id'])->update($data);
                if($row!=false){
                    $arr['flag']=1;
                }else{
                    $arr['flag']=0;
                }

            }
                return json($arr);
    }
    public function reply_agent(){
        if(!empty(input('id'))){
            $agent=Db('agent')->where('id',input('id'))->find();
            $this->assign('agent',$agent);
        }
        return $this->fetch();
    }
}