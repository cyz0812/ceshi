<?php
namespace app\Jump\Controller;
use think\Controller;
use think\Rsa;
class Jump extends Controller {
	public function _empty(){
		echo "<center><img src='/Public/img/404.gif'></center>";
	}
	public function jump(){

		if(!empty(input('account'))){
			$user=Db('xinguanjia')->where('account',input('account'))->find();
			$this->assign('user',$user);
	    	$this->assign('out_orderid',date("ymdHis").rand(1000,9999));
	    	$goods=Db('aqihuo')->where('state=1')->select();
	    	$this->assign('goods',$goods);
	    	$good=Db('aqihuo')->where("type",'hsi')->find();
	    	$this->assign('good',$good);
	    	$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
	    	$weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
	    	$this->assign('zhifubao',$zhifubao);
	    	$this->assign('weixin',$weixin);
	    	$switch=Db('payway')->where('display=1')->order('order_num')->select();
	    	$this->assign('switch',$switch);
            $new_xin=Db('payway')->where('display_xin=0')->order('order_num')->select();
            $this->assign('new_xin',$new_xin);
	    	echo $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
    public function jumptext(){
        if(!empty(input('account'))){
            $user=Db('xinguanjia')->where('account',input('account'))->find();
            $this->assign('user',$user);
            $this->assign('out_orderid',date("ymdHis").rand(1000,9999));
            $goods=Db('aqihuo')->where('state=1')->select();
            $this->assign('goods',$goods);
            $good=Db('aqihuo')->where("type",'hsi')->find();
            $this->assign('good',$good);
            $zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
            $weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
            $this->assign('zhifubao',$zhifubao);
            $this->assign('weixin',$weixin);
            $switch=Db('payway')->where('display_old=1')->order('order_num')->select();
            $this->assign('switch',$switch);
            $old_xin=Db('payway')->where('display_xinold=0')->order('order_num')->select();
            $this->assign('old_xin', $old_xin);
            echo $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
    public function jumptest1(){
        if(!empty(input('account'))){
            $user=Db('xinguanjia')->where('account',input('account'))->find();
            $this->assign('user',$user);
            $this->assign('out_orderid',date("ymdHis").rand(1000,9999));
            $goods=Db('aqihuo')->where('state=1')->select();
            $this->assign('goods',$goods);
            $good=Db('aqihuo')->where("type",'hsi')->find();
            $this->assign('good',$good);
            $zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
            $weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
            $this->assign('zhifubao',$zhifubao);
            $this->assign('weixin',$weixin);
            $switch=Db('payway')->order('order_num')->select();
            $this->assign('switch',$switch);
            echo $this->fetch();
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }
    public function jumpold(){
    	if(!empty(input('account'))){
    		$user=Db('xinguanjia')->where('account',input('account'))->find();
    		$this->assign('user',$user);
    		$this->assign('out_orderid',date("ymdHis").rand(1000,9999));
    		$goods=Db('aqihuo')->where('state=1')->select();
    		$this->assign('goods',$goods);
    		$good=Db('aqihuo')->where("type",'hsi')->find();
    		$this->assign('good',$good);
    		$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
    		$weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
    		$this->assign('zhifubao',$zhifubao);
    		$this->assign('weixin',$weixin);
    		$switch=Db('payway')->where('display_old=1')->order('order_num')->select();
    		$this->assign('switch',$switch);
            $old_xin=Db('payway')->where('display_xinold=0')->order('order_num')->select();
            $this->assign('old_xin', $old_xin);
    		echo $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
    public function interjump(){
    	if(!empty(input('account'))){
    		$user=Db('xinguanjia')->where('account',input('account'))->find();
    		$this->assign('user',$user);
    		$this->assign('out_orderid',date("ymdHis").rand(1000,9999));
    		$goods=Db('aqihuo')->where('state=1')->select();
    		$this->assign('goods',$goods);
    		$good=Db('aqihuo')->where("type",'hsi')->find();
    		$this->assign('good',$good);
    		$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
    		$weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
    		$this->assign('zhifubao',$zhifubao);
    		$this->assign('weixin',$weixin);
    		echo $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
    public function jumpmt(){
    	if(!empty(input('account'))){
    		$user=Db('xinguanjia')->where('account',input('account'))->find();
    		$this->assign('user',$user);
    		$this->assign('out_orderid',date("ymdHis").rand(1000,9999));
    		$goods=Db('aqihuo')->where('state=1')->select();
    		$this->assign('goods',$goods);
    		$good=Db('aqihuo')->where("type",'hsi')->find();
    		$this->assign('good',$good);
    		$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->getField('img');
    		$weixin=Db('erweima')->where("type='weixin' AND state=1")->getField('img');
    		$this->assign('zhifubao',$zhifubao);
    		$this->assign('weixin',$weixin);
    		echo $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
	public function jumpregister(){
    	/* $source=$_SERVER["HTTP_REFERER"];
    	if(stristr($source,"http://xmyttz.cn")==false)die("访问路径有误"); */
    	$xgj=Db('xinguanjia');
    	if(input('account')){
    		$arr['flag']=1;
    		$map['account']=input('account');
    		$account_row=$xgj->where($map)->find();
    		if(!$account_row){
    		    $data=$_POST;
    			$data['reg_time']=date("Y-m-d H:i:m",time());
    			$data['deposit_card']=input('card');
                $row=$xgj->insert($data);
                if(!!$row){
    				$map2['account']=input('account');
    				$account_id=$xgj->where($map2)->value('id');
    				$arr['body']=$account_id;
    			}else{
    				$arr['flag']=0;
    			}
    		}else{
    			$save_map['account']=input('account');
				if(!empty(input('card'))){
					$data['card']=input('card');
				}
    			if(!empty(input('bink_bankname'))){
					$data['bankname']=input('bink_bankname');
				}
    			if(!empty(input('phone'))){
					$data['phone']=input('phone');
				}
    			/* if(in_array($account_row['name'], ['朱华良','胡为','刘秋慧','康正义'])){
    				
    			} */
				if(!empty(input('name'))){
					$data['name']=input('name');
				}
    			if(!$account_row['deposit_card']){
    				$data['deposit_card']=input('card');
    			}

    			$save_row=$xgj->where($map)->update($data);
    			if($save_row === false){
    				$arr['flag']=0;
    			}else{
    				$arr['body']=$account_row['id'];
    			}
    		}
    		return json($arr);
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
    public function jumpDeposit(){
    	if($_SESSION['out_orderid']){
    		$capital=Db('capital');
    		$map['out_orderid']=$_SESSION['out_orderid'];
    		$capital_row=$capital->where($map)->find();
    		if(!!$capital_row){
    			$this->assign('capital',$capital_row);
    			$fee=number_format($capital_row['amount']*3/1000,2);
    			$real_amount=number_format($capital_row['amount']-$fee,2);
	    		$this->assign('real_amount',$real_amount);
    			echo $this->fetch();
    		}
    	}else{
    		echo "<center><img src='".__ROOT__."/Public/img/404.gif'></center>";
    	}
    	
    }
    public function jumpWithdraw(){
    	$xgj=Db('xinguanjia');
    	$xgjrecord=Db('xgjrecord');
    	$capital=Db('capital');
    	if(input('out_orderid')){
    		if(input('withdraw')=='全部提现'||input('withdraw')=='全部'){
    		    $real_amount=input('withdraw').'-2';
    		}else{
    			$real_amount=number_format(input('withdraw')-2,2);
    		}
    		$this->assign('account',input('account'));
    		$this->assign('card',input('card'));
    		$this->assign('name',input('name'));
    		$this->assign('real_amount',$real_amount);
    		echo $this->fetch();
    	}else{
    		echo "<center><img src='/Public/img/404.gif'></center>";
    	}
    }
	public function jumpwithdrawSuccess(){
    	$xgj=Db('xinguanjia');
    	$xgjrecord=Db('xgjrecord');
    	$capital=Db('capital');
    	$arr['flag']=0;
    	if(input('out_orderid')){
    		$map['account']=input('account');
    		$account_row=$xgj->where($map)->find();
    		if(!!$account_row){
    			$data_xgj['cardprovince']=input('cardprovince');
    			$data_xgj['cardcity']=input('cardcity');
    			$data_xgj['bankbranchname']=input('bankbranchname');
    			if(!empty(input('bankname'))){
					$data_xgj['bankname']=input('bankname');
				}
				$time=date("Y-m-d H:i:s",time());
    			$xgj->where($map)->update($data_xgj);
                $_POST['body']=$account_row['id'];
    			$datas=$_POST;

                $datas['transtime']=$time;
                $datas['state']='处理中';
                $datas['withdraw']=(float)$_POST['withdraw'];
                $datas['amount']=(float)$_POST['withdraw'];
    			$record_row=$xgjrecord->insert($datas);
    			
    			if(!!$record_row){
    				$data['capital_type']='1';
    				$data['belong']='xgj';
    				$data['userid']=$_POST['body'];
    				$data['method']='withdraw';
    				$data['out_orderid']=$_POST['out_orderid'];
    				$data['amount']=(float)$_POST['withdraw'];
    				$data['account']=$_POST['account'];
    				$data['type']='信管家出金';
    				$data['name']=$_POST['name'];
    				$data['phone']=$_POST['phone'];
    				$data['bankname']=$_POST['bankname'];
    				$data['cardcity']=$_POST['cardcity'];
    				$data['cardprovince']=$_POST['cardprovince'];
    				$data['bankbranchname']=$_POST['bankbranchname'];
    				$data['card']=$_POST['card'];
					$data['type_kind']='aqihuo';
    				$data['state']='0';
    				$data['sendtime']=$time;
    				$capital_row=$capital->insert($data);
    				if(!!$capital_row){
    					$arr['flag']=1;
    					if($_POST['withdraw']=='全部提现'|| $_POST['withdraw']=='全部'){
    						$real_amount=$_POST['withdraw'].'-2';
    					}else{
    						$real_amount=number_format($_POST['withdraw']-2,2);
    					}
    					$url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/withdraw_apply.php';
    					$data_val['phone']=config('MESSAGE_PHONE');
    					$data_val['kind']='信';
    					$data_val['name']=$_POST['name'];
    					$data_val['bank']=$_POST['bankname'];
    					$data_val['card']=$_POST['card'];
    					$data_val['account']=$_POST['account'];
    					$data_val['real_money']=$real_amount;
    					php_post($url, $data_val);
    						
    					$agent=Db('agent')->select();
    					foreach ($agent as $v){
    						if(substr($data_val['account'],0,3)==$v['account_front']){
    							$data_val['phone']=$v['phone'];
    							php_post($url, $data_val);
    						}
    					}
    				}
    			}
    		}
    	}
    	return json($arr);
    }
    public function jumpprior(){
    	$xgj=Db('xinguanjia');
    	$xgjrecord=Db('xgjrecord');
    	$capital=Db('capital');
    	$arr['flag']=0;
    	if($_POST['out_orderid']){
    		$map['account']=$_POST['account'];
    		$account_row=$xgj->where($map)->find();
    		if(!$account_row){
    			$_POST['reg_time']=date("Y-m-d H:i:m",time());
    			$account_row=$xgj->insert($_POST);
    		}else{
    			$xgj->where($map)->update($_POST);
    		}
    		$_POST['body']=$account_row['id'];
    		$time=date("Y-m-d H:i:s",time());
    		$_POST['transtime']=$time;
    		$_POST['state']='处理中';
    		$record_row=$xgjrecord->insert($_POST);

    		if(!!$record_row){
    			$data['capital_type']='1';
    			$data['belong']='xgj';
    			$data['userid']=$_POST['body'];
    			$data['method']='prior';
    			$data['out_orderid']=$_POST['out_orderid'];
    			$data['amount']=$_POST['amount'];
    			$data['account']=$_POST['account'];
    			$data['type']=$_POST['type'];
    			$data['name']=$_POST['name'];
    			$data['phone']=$account_row['phone'];
				$data['type_kind']='aqihuo';
    			$data['state']='0';
    			$data['sendtime']=$time;
    			$capital_row=$capital->insert($data);
    			if(!!$capital_row){
    				$arr['flag']=1;
    			}
    		}
    	}
    	return json($arr);
    }
    public function jumphands(){
    	$xgj=Db('xinguanjia');
    	$xgjrecord=Db('xgjrecord');
    	$capital=Db('capital');
    	$arr['flag']=0;
    	if($_POST['out_orderid']){
    		$map['account']=$_POST['account'];
    		$account_row=$xgj->where($map)->find();
    		$_POST['body']=$account_row['id'];
    		$time=date("Y-m-d H:i:s",time());
    		$_POST['transtime']=$time;
    		$_POST['state']='处理中';
    		$record_row=$xgjrecord->insert($_POST);
    		if(!!$record_row){
    			$data['capital_type']='1';
                $data['belong']='xgj';
    			$data['userid']=$_POST['body'];
    			$data['method']='prior';
    			$data['out_orderid']=$_POST['out_orderid'];
    			$data['account']=$_POST['account'];
    			$data['type']=$_POST['type'];
    			$data['hands']=$_POST['hands'];
    			$data['name']=$account_row['name'];
    			$data['phone']=$account_row['phone'];
				$data['type_kind']='aqihuo';
    			$data['state']='0';
    			$data['sendtime']=$time;
    			$capital_row=$capital->insert($data);
    			if(!!$capital_row){
    				$arr['flag']=1;
    			}
    		}
    	}
    	return json($arr);
    }
	
	public function webllpay_pay(){
        $xgj=Db('xinguanjia');
        $capital=Db('capital');
        $time=date("Y-m-d H:i:s",time());
        $map['account']=input('account');
        $account_row=$xgj->where($map)->find();
        if(!!$account_row){
            if(!empty(input('card'))){
                $data_save['card']=input('card');
                $data_save['deposit_card']=input('card');
            }
            if(!empty(input('bankname'))){
                $data_save['bankname']=input('bankname');
            }
            if(!empty(input('name'))){
                $data_save['name']=input('name');
            }
            if(!empty(input('nickname'))){
                $data_save['nickname']=input('nickname');
            }
            if(!empty(input('phone'))){
                $data_save['phone']=input('phone');
            };
            $xgj->where("id",$account_row['id'])->update($data_save);
            $account_row=$xgj->where("id",$account_row['id'])->find();
        }elseif(!$account_row){
            $_POST['deposit_card']=input('card');
            $_POST['reg_time']=date("Y-m-d H:i:m",time());
            $account_row=input('post.');
            $account_row['id']=$xgj->insert($_POST);
        }
        $data['capital_type']='1';
        $data['belong']='xgj';
        $data['pay_type']=02;
        $data['userid']=$account_row['id'];
        $data['method']=$_POST['method'];
        $data['out_orderid']=$_POST['out_orderid'];
        $data['amount']=$_POST['amount'];
        $data['card']=$account_row['card'];
        $data['deposit_card']=$account_row['card'];
        $data['bankname']=$account_row['bankname'];
        $data['account']=$_POST['account'];
        $data['type']=$_POST['type'];
        $data['name']=$account_row['name'];
        $data['phone']=$_POST['phone'];
        $data['type_kind']='aqihuo';
        $data['state']='-1';
        $data['sendtime']=$time;
        $capital_row=$capital->insert($data);
        if(!!$capital_row){
            $arr['flag']=1;
        }
       return json($arr);
    }
	
	public function erweima() {
		if(!empty(input('account'))){
			$this->assign('out_orderid',date("ymdHis").rand(1000,9999));
			$user=Db('xinguanjia')->where("account=%d",input('account'))->find();
			$this->assign('user',$user);
			echo $this->fetch();
		}else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	}
	public function zhifubao() {
		if(!empty(input('amount'))){
			$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
			$weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
			$this->assign('zhifubao',$zhifubao);
			$this->assign('weixin',$weixin);
			$this->assign('info',$_POST);
			echo $this->fetch();
		}else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	}
	public function erweima_success(){
		$xgj=Db('xinguanjia');
		$xgjrecord=Db('xgjrecord');
		$capital=Db('capital');
		$time=date("Y-m-d H:i:s",time());
		$map['account']=input('account');
		$account_row=$xgj->where($map)->find();
		$privDecrypt = Rsa::privDecrypt(input('nickname'));
		if($privDecrypt!=null){
			$data['nickname']=$privDecrypt;
		}else{
			$arr['flag']=0;
		return json($arr);
			exit;
		}
		if(!!$account_row){
			if(!empty(input('card'))){
				$data_save['card']=input('card');
				$data_save['deposit_card']=input('card');
			}
			if(!empty(input('bankname'))){
				$data_save['bankname']=input('bankname');
			}
			if(!empty(input('name'))){
				$data_save['name']=input('name');
			}
			if(!empty(input('nickname'))){
				$data_save['nickname']=input('nickname');
			}
			if(!empty(input('phone'))){
				$data_save['phone']=input('phone');
			}

			$xgj->where("id",$account_row['id'])->update($data_save);
            $account_row=$xgj->where("id",$account_row['id'])->find();
		}elseif(!$account_row){
			$data['deposit_card']=input('card');
			$data['reg_time']=date("Y-m-d H:i:m",time());
			$account_row=input();
			$account_row['id']=$xgj->insert($data);
		}
		$data['capital_type']='1';
		$data['belong']='xgj';
		$data['pay_type']=03;
		$data['userid']=$account_row['id'];
		$data['method']=input('method');
		$data['out_orderid']=input('out_orderid');
		$data['order_num']=input('order_num');
		$data['amount']=input('amount');
		$data['card']=$account_row['card'];
		$data['deposit_card']=$account_row['card'];
		$data['bankname']=$account_row['bankname'];
		$data['account']=input('account');
		$data['type']=input('type');
		$data['name']=$account_row['name'];
		$data['phone']=input('phone');
		$data['type_kind']='aqihuo';
		$data['state']='0';
		$data['sendtime']=$time;
		$capital_row=$capital->insert($data);
		if(!!$capital_row){
			$arr['flag']=1;
			$url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/erweima_apply.php';
			$data_val['phone']=config('MESSAGE_PHONE');
			$data_val['kind']=$data['type'];
			$data_val['name']=$data['name'];
			$data_val['account']=$data['account'];
			$data_val['account_phone']=$data['phone'];
			if(!intval($_POST['amount'])){
				$data_val['money']='全部-2';
			}else{
				if($data['method']=='deposit'){
					$data_val['money']=$data['amount'];
				}else{
					$data_val['money']=number_format($data['amount']-2,2);
				}
			}
			php_post($url, $data_val);
				
			$agent=Db('agent')->select();
			foreach ($agent as $v){
				if(substr($data_val['account'],0,3)==$v['account_front']){
					$data_val['phone']=$v['phone'];
					php_post($url, $data_val);
				}
			}
		}
		return json($arr);
	}
	public function weixin() {
		if(!empty(input('amount'))){
			$zhifubao=Db('erweima')->where("type='zhifubao' AND state=1")->value('img');
			$weixin=Db('erweima')->where("type='weixin' AND state=1")->value('img');
			$this->assign('zhifubao',$zhifubao);
			$this->assign('weixin',$weixin);
			$this->assign('info',input('post.'));
			echo $this->fetch();
		}else{
			echo "<center><img src='/Public/img/404.gif'></center>";
		}
	}
	public function weixinqr() {
			$this->assign('info',input('post.'));
			echo $this->fetch();
	}
	public function weixin_pay(){
		$xgj=Db('xinguanjia');
		$capital=Db('capital');
		$time=date("Y-m-d H:i:s",time());
		$map['account']=input('account');
		$account_row=$xgj->where($map)->find();
		if(!!$account_row){
			if(!empty(input('card'))){
				$data_save['card']=input('card');
				$data_save['deposit_card']=input('card');
			}
			if(!empty(input('bankname'))){
				$data_save['bankname']=input('bankname');
			}
			if(!empty(input('name'))){
				$data_save['name']=input('name');
			}
			if(!empty(input('nickname'))){
				$data_save['nickname']=input('nickname');
			}
			if(!empty(input('phone'))){
				$data_save['phone']=input('phone');
			}
			$xgj->where("id",$account_row['id'])->update($data_save);
			$account_row=$xgj->where("id",$account_row['id'])->find();
		}elseif(!$account_row){
			$_POST['deposit_card']=$_POST['card'];
			$_POST['reg_time']=date("Y-m-d H:i:m",time());
			$account_row=input('post.');
			$account_row['id']=$xgj->insert(input('post.'));
		}
		$data['capital_type']='1';
        $data['belong']='xgj';
        $daat['pay_type']=04;
		$data['userid']=$account_row['id'];
		$data['method']=$_POST['method'];
        $data['out_orderid']=$_POST['out_orderid'];
		$data['amount']=$_POST['amount'];
		$data['card']=$account_row['card'];
		$data['deposit_card']=$account_row['card'];
		$data['bankname']=$account_row['bankname'];
		$data['account']=$_POST['account'];
		$data['type']=$_POST['type'];
		$data['name']=$account_row['name'];
		$data['phone']=$_POST['phone'];
		$data['type_kind']='aqihuo';
		$data['state']='-1';
		$data['sendtime']=$time;
		$capital_row=$capital->insert($data);
		if(!!$capital_row){
			$arr['flag']=1;
		}
		return json($arr);
	}
	public function had_pay(){
		$capital=Db('capital');
		$map['out_orderid']=input('no_order');
		$info = $capital->where($map)->find();
		if(!empty($info) && $info['state'] == 0){
			$arr['flag'] = 1;
		}else{
			$arr['flag'] = 0;
		}
		return json($arr);
	}
	public function had_nickname(){
		$xgj=Db('xinguanjia');
		if(!empty(input('account'))){
			$arr['flag']=0;
			$map['account']=input('account');
			$account_row=$xgj->where($map)->find();
			if(!!$account_row['nickname']){
				$arr['flag']=1;
			}
		}
	return json($arr);
	}
	
	public function type_select(){
		$aqihuo=Db('aqihuo');
		if(!empty(input('type'))){
			$good=$aqihuo->where("type'",input('type'))->find();
		}
		return json($good);
	}
	
	
}
