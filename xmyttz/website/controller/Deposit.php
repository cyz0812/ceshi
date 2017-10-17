<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 下午 4:12
 */

namespace app\website\controller;

use think\controller;

use app\base\controller\Base;

use app\website\model\Deposit as DepositModel;

class Deposit extends Base{
    public function record_deposit_w(){
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
        $map['method'] = 'deposit';
        $deposit = DepositModel::show($map);
        $page    = $deposit->render();
        $this->assign('deposit',$deposit);
        $this->assign('page',$page);
        return $this->fetch();
    }


    public function detail_record_deposit(){
        $user = Db('user');
        $invitelist = Db('invitelist');
        if (input('id')) {
            $deposit = DepositModel::deposit();
            $fee = number_format($deposit['amount'] * 3 / 1000, 2);
            $real_amount = number_format($deposit['amount'] - $fee, 2);
            if (!!$deposit['userid']) {
                $account_user = $user->where('id', $deposit['userid'])->find();
                $zfb_num = substr($deposit['nickname'], 0, 3) . '****' . substr($deposit['nickname'], 7);
                $this->assign('user', $account_user);
                $this->assign('zfb_num', $zfb_num);
            }
            if (!empty($deposit['invite'])) {
                $agent = $invitelist->where("invite_code", $account_user['invite'])->find();
                $this->assign('agent', $agent);
            }
            $this->assign('deposit', $deposit);
            $this->assign('fee', $fee);
            $this->assign('real_amount', $real_amount);
            return $this->fetch();
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }

    }
}