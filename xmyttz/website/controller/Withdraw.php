<?php
/*
 * 出金管理模块
 * 获取、读取、转到记录
 * add by liang 2017-08-14
 */
namespace app\website\controller;
use app\base\controller\Base;
use app\website\model\Withdraw as WithdrawModel;
use think\Session;
class Withdraw extends Base {
    public function record_withdraw_w(){
        $input   = input('');
        if(!empty($input['start_date'])){
            $map['replytime'] = ['between time',array($input['start_date'],$input['end_date'])];
        }else{
            $map['replytime'] = ['> time',date('Y-m-d H:i:s',strtotime('-1 day'))];
            $this->assign('start_date',date('Y-m-d H:i:s',strtotime('-1 day')));
            $this->assign('end_date',date('Y-m-d H:i:s',time()));
        }
        if(!empty($input['condition']) && !empty($input['value'])){
            if($input['condition']=='state' && $input['value']=='处理中'){
                $input['value'] = 0;
            }
            elseif($input['condition']=='state' && $input['value']=='成功'){
                $input['value'] = 1;
            }
            elseif($input['condition']=='state' && $input['value']=='失败'){
                $input['value'] = 2;
            }

            if($input['condition']=='amount'){
                $map[$input['condition']] = $input['value'];
            }elseif($input['condition']=='out_orderid'){
                $map[$input['condition']] = array('like','%'.$input['value']);
            }else{
                $map[$input['condition']] = array('like',$input['value'].'%');
            }
        }
            $map['capital_type']=0;
            $map['method'] = 'withdraw';
            $withdraw = WithdrawModel::show($map);
            $page    = $withdraw->render();
            $this->assign('withdraw',$withdraw);
            $this->assign('page',$page);
            return $this->fetch();
    }
    public function detail_record_withdraw(){
        $invitelist = Db('invitelist');
        if(input('id')){
            $withdraw = WithdrawModel::withdraw();
            if($withdraw['amount']==0){
                $real_amount = '全部-2';
            }else{
                $real_amount = number_format($withdraw['amount']-2,2);
            }
            if(!empty($withdraw['invite'])){
                $agent = $invitelist->where("invite_code",$withdraw['invite'])->find();
                $this->assign('agent',$agent);
            }
            $this->assign('real_amount',$real_amount);
            $this->assign('withdraw',$withdraw);
            return $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }

    }





}