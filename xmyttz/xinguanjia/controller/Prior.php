<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 下午 5:26
 *
 * 信管家优先金
 */

namespace app\xinguanjia\controller;

use think\controller;

use app\base\controller\Base;

use app\xinguanjia\model\Prior as PriorModel;

class Prior extends Base{
//优先金遍历
    public function yt_prior(){
        $deposit_x  =   PriorModel::deposit_x();
        $this->assign('deposit_x',$deposit_x);
        $deposit_w  =   PriorModel::deposit_w();
        $this->assign('deposit_w',$deposit_w);
        echo  $this->fetch();
    }


//    客户优先详细信息
    public function detail_prior(){
        if(input('id')){
            $deposit = PriorModel::deposit();

            $this->assign('deposit',$deposit);
            if(!!$deposit['userid']){
            	if($deposit['capital_type'] == 1){
            		$account_user = PriorModel::xgjuser($deposit);
            	}else{
            		$account_user = PriorModel::user($deposit);
            	}

                $this->assign('user',$account_user);
            }
            if(!empty($account_user['invite'])){
                $agent = PriorModel::agent($account_user);
                $this->assign('agent',$agent);
            }
            $record_map['body'] = $deposit['userid'];
            $user_record = PriorModel::record();
            $this->assign('user_record',$user_record);
            echo $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }

//优先金申请更改
    public function reply_prior(){
        $time=date("Y-m-d H:i:s",time());
        if(!empty(input('id'))){
            $deposit = PriorModel::deposit();;
            $this->assign('deposit',$deposit);
            $this->display();
        }elseif(!empty(input('success'))){
            $data['state'] = 1;
            $data['replytime'] = $time;
            $row = PriorModel::row($data);
            if(!!$row){
                $this->success('处理成功！','yt_prior');
            }else{
                $this->error('回复数据更新失败，请联系相关技术人员！！','yt_prior');
            }
        }elseif(!empty(input('error'))){
            $data['state'] = 2;
            $data['replytime'] = $time;
            $row=PriorModel::error($data);
            if(!!$row){
                $this->success('处理成功！','yt_prior');
            }else{
                $this->error('入金错误处理失败，请重试！','yt_prior');
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    优先金记录表
    public function record_prior(){
        $capital = Db('capital');
        $input   = input('');
        if(!empty($input['start_date'])){
            $map['replytime'] = ['between time',array($input['start_date'],$input['end_date'])];
        }else{
            $map['replytime'] = ['> time',date('Y-m-d H:i:s',strtotime('-1 day'))];
            $this->assign('start_date',date('Y-m-d H:i:s',strtotime('-1 day')));
            $this->assign('end_date',date('Y-m-d H:i:s',time()));
        }
        if(!empty($input['capital_type']) && $input['capital_type']==='0'){
            $map['capital_type'] = $input['capital_type'];
        }else if(!empty($input['capital_type']) && $input['capital_type'] !=- 1){
            $map['capital_type'] = $input['capital_type'];
        }
        if(!empty($input['condition']) && !empty($input['value'])){
            if($input['condition'] =='state' && $input['value'] =='处理中'){
                $input['value'] = 0;
            }
            elseif($input['condition'] == 'state' && $input['value'] =='成功'){
                $input['value'] = 1;
            }
            elseif($input['condition'] == 'state' && $input['value'] =='失败'){
                $input['value'] = 2;
            }
            if($input['condition'] == 'amount'){
                $map[$input['condition']] = $input['value'];
            }elseif($input['condition'] =='out_orderid'){
                $map[$input['condition']] = array('like','%'.$input['value']);
            }else{
                $map[$input['condition']] = array('like',$input['value'].'%');
            }
        }
        $map['method'] = array('in','prior,1');
        $deposit = PriorModel::aa($map);
        $page    = $deposit->render();
        $this->assign('deposit',$deposit);
        $this->assign('page',$page);
        return $this->fetch();
    }






//优先金记录详情
    public function detail_record_prior(){
        $user       = Db('user');
        $invitelist = Db('invitelist');
        if(input('id')){
            $deposit     = PriorModel::deposit();;
            $fee         = number_format($deposit['amount']*3/1000,2);
            $real_amount = number_format($deposit['amount']-$fee,2);
            $zfb_num     = substr($deposit['nickname'], 0,3).'****'.substr($deposit['nickname'], 7);
                if(!!$deposit['userid']){
            	if($deposit['capital_type'] == 1){
            		$account_user = PriorModel::xgjuser($deposit);
            	}else{
            		$account_user = PriorModel::user($deposit);
            	}
                $this->assign('user',$account_user); 
            }
            if(!empty($deposit['invite'])){
                $agent = $invitelist->where("invite_code",$account_user['invite'])->find();
                $this->assign('agent',$agent);
            }
            $this->assign('deposit',$deposit);
            $this->assign('fee',$fee);
            $this->assign('real_amount',$real_amount);
            $this->assign('zfb_num',$zfb_num);
            return $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }

    }
}