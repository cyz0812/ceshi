<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/11 0011
 * Time: 下午 12:08
 *
 *开户记录
 */

namespace app\website\controller;

use think\controller;

use app\base\controller\Base;

use app\website\model\Record as CordModel;

class Record extends Base
{

//信管家开户记录表
    public function record_open() {
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
    	}else if(!empty($input['capital_type']) && $input['capital_type']!=-1){
    		$map['capital_type'] = $input['capital_type'];
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
		$map['method'] = 'open';
		$deposit = $capital->where($map)->order('replytime desc')->paginate(30,false,['query' => input('param.')]);
		$page    = $deposit->render();
		$this->assign('deposit',$deposit);
		$this->assign('page',$page);
		return $this->fetch();
    }

//客户开户详细信息
    public function detail_record_open() {
    	$user       = Db('user');
    	$xgjuser    = Db('xinguanjia');
        if (input('id')) {
            $deposit = CordModel::deposit();
            $fee = number_format($deposit['amount'] * 3 / 1000, 2);
            $real_amount = number_format($deposit['amount'] - $fee, 2);
            if (!!$deposit['userid']) {
            	if($deposit['capital_type'] == 1){
					$account_user = $xgjuser->where('id',$deposit['userid'])->find();

				}else{
					$account_user = $user->where('id',$deposit['userid'])->find();

				}
                $this->assign('user', $account_user);

            }
            if (!empty($account_user['invite'])) {
                $invite_name = CordModel::invite($account_user);
                $this->assign('invite_name', $invite_name);

            }
            $this->assign('deposit', $deposit);

            $this->assign('fee', $fee);
            $this->assign('real_amount', $real_amount);
            if (input('day') != -1) {
                if (input('day')) {
                    $record_map['trans_time'] = array('GT', date('Y-m-d H:i:s', strtotime('-' . input('day') . ' day')));
                } else {
                    $record_map['trans_time'] = array('GT', date('Y-m-d H:i:s', strtotime('-1 week')));
                }
            }
            if (!empty(input('recordtype')) && input('recordtype') != -1) {
                $record_map['method'] = $_GET['recordtype'];
            }
            $record_map['body'] = $deposit['userid'];
            $user_record = CordModel::record();
            $show = $user_record->render();
            $this->assign('user_record', $user_record);
            $this->assign('page', $show);
            echo $this->fetch();
        } else {
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }

    public function reply_open(){

        $capital=Db('capital');
        $record=Db('record');
        $user=Db('user');
        $time=date("Y-m-d H:i:s",time());
        if(!empty(input('id'))){
            $capitals=$capital->where('id',input('id'))->find();
            $this->assign('capital',$capitals);
           echo  $this->fetch();
        }elseif(!empty(input('success'))){
            $data['state']=1;
            $data['replytime']=$time;
            $row=$capital->where('id',input('success'))->update($data);
            if(!!$row){
                getAlert('处理成功！','/website/record/record_open');

            }else{
                getAlert('处理失败！','/website/record/record_open');
            }
        }elseif(!empty(input('error'))){
            $out_orderid=$capital->where("id",input('error'))->value('out_orderid');
            $record_data['state']='申请失败';
            $record_data['notifytime']=date("Y-m-d H:i:s",time());
            $record->where("out_orderid",$out_orderid)->update($record_data);
            $data['state']=2;
            $data['replytime']=$time;
            $row=$capital->where('id',input('error'))->update($data);
            if(!!$row){
                getAlert('处理成功！','yt_open');

            }else{
                getAlert('入金错误处理失败，请重试！','yt_open');
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }

    public function open_success(){

        $user=Db('user');
        $record=Db('record');
        $capital=Db('capital');
        $message=Db('message');
        if(!empty($_POST['userid'])){
            if($_POST['type_kind']=='aqihuo'){
                $data['a_account']=$_POST['account'];
                $data['a_account_password']=$_POST['account_password'];

                $user_row = Db('user')->where('del=0')->where('id',$_POST['userid'])->find();
                $xgj_row  = Db('xinguanjia')->where('del=0')->where('account',$_POST['account'])->find();
                if(empty($xgj_row)){
                    $data_xgj['account'] 		= $_POST['account'];
                    $data_xgj['name']    		= $user_row['name'];
                    $data_xgj['phone']   		= $user_row['phone'];
                    $data_xgj['bankname']		= $user_row['bankname'];
                    $data_xgj['card']    		= $user_row['card'];
                    $data_xgj['deposit_card']	= $user_row['card'];
                    $data_xgj['invite']			= $user_row['invite'];
                    $data_xgj['regtime']  		= date('Y-m-d H:i:s',$user_row['reg_time']);

                    Db('xinguanjia')->insert($data_xgj);
                }

            }elseif($_POST['type_kind']=='dqihuo'){
                $data['d_account']=$_POST['account'];
                $data['d_account_password']=$_POST['account_password'];
            }elseif($_POST['type_kind']=='shares'){
                $data['s_account']=$_POST['account'];
                $data['s_account_password']=$_POST['account_password'];
            }
            $row=$user->where('id',$_POST['userid'])->update($data);
            if($row === false){
                $arr['flag']=0;
            }else{
                /* $message_data['userid']=$_POST['userid'];
                $message_data['type']=2;
                $message_data['state']=0;
                $message_data['title']='您的开户配资已成功';
                $message_data['content']='尊敬的用户，您的账户【'.$_POST['account'].'】已开通，登录密码为【'.$_POST['account_password'].'】，支付本金为【'.$_POST['amount'].'】元的配资方案已成功到账，本次订单号为【'.$_POST['out_orderid'].'】，如有疑问请联系客服！';
                $message_data['date']=date("Y-m-d H:i:s",time());
                $message_add=$message->add($message_data); */
                $arr['flag']=1;
            }
            return json($arr);
        }

    }
}