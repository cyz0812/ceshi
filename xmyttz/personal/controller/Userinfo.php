<?php
/*
 * 用户信息模块
 */
namespace app\personal\controller;
use app\login\controller\Base;
use app\website\model\User;
use app\info\model\Record;
use think\Session;
use think\Rsa;



class Userinfo extends Base {


	//	设置电话
	public function setphone(){
		if($phone_user=$this->loginUser('/login/login/login')){
			$mobile = substr($phone_user['phone'], 0, 3).'****'.substr($phone_user['phone'], 7);
			$this->assign('mobile',$mobile);
			$this->assign('user',$phone_user);
			echo $this->fetch();
		}
	}
	
	
	//    发送验证码
	public function is_setphone_code(){
		$arr['flag']=0;
		session_start();
		if($_POST['code']==$_SESSION['code']&&$_POST['phone']==$_SESSION['code_phone']){
			$_SESSION['setphone']=$_SESSION['code'];
			$_SESSION['code']==NULL;
			$arr['flag']=1;
		}
		return json($arr);
	}
	
	
	//    修改电话号码
	public function newphone(){
		if($phone_user=$this->loginUser('/login/login/login')){
			if(!empty($_SESSION['setphone'])){
				$this->assign('user',$phone_user);
				echo $this->fetch();
			}else{
				echo "<script>location.href='/personal/user/setphone'</script>";
			}
		}
	}
	
	
	//    重回登录界面
	public function re_login(){
		$_SESSION = array();
		session(null);
		getAlert(null,'/login/login/login');
	}
	/*
	 * 银行卡模块
	 */
	//绑定银行卡
	public function addcard() {
		$user = parent::loginUser('/Login/Login/login');
		$this->assign('user',$user);
		
    	if(!empty($user['card'])){
    		getAlert(null,'setcard');
    		exit;
    	}
    	if(empty($_COOKIE['addcardPath'])){
    		cookie('addcardPath','/Personal/Userinfo/setcard');
    	}
		echo $this->fetch();
	}
	//添加ajax处理
	public function addcard_success(){
		parent::loginUser('/Login/Login/login');
		if(!empty($_POST['card'])){
			$row = User::getsave(array('phone' => session('phone')),$_POST);
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
		$user = parent::loginUser('/Login/Login/login');
		
		$card      = substr($user['card'], 0, 4).'***********'.substr($user['card'], 15);
		$cardphone = substr($user['cardphone'], 0, 3).'****'.substr($user['cardphone'], 7);
		$this->assign('card'      , $card);
		$this->assign('cardphone' , $cardphone);
		$this->assign('user'      , $user);
		echo $this->fetch();
	}


//	出入金记录
    public function dealRecord(){
        $record =   Db('record');
        session_start();
        $phone_user = parent::loginUser('/Login/Login/login');
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
                    $record_map['trans_time']   =   array('GT',date('Y-m-d H:i:s',strtotime('-'.$_GET['day'].' day')));
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
            $user_record=$record->where($record_map)->order('trans_time','desc')->paginate(10,false,['query' => input('param.')]);
            $show   =   $user_record->render();
            $this->assign('balance',$phone_user['balance']);
            $this->assign('user_record',$user_record);
            $this->assign('page',$show);
            echo $this->fetch();

    }


//    返回设置
    public function userInfo(){
            session_start();
            $phone_user = parent::loginUser('/Login/Login/login');
            $mobile     = substr(session('phone'), 0, 3).'****'.substr(session('phone'), 7);
            $this->assign('mobile',$mobile);
            $this->assign('user',$phone_user);
            $this->assign('username',$phone_user['username']);
            echo $this->fetch();
    }


//    设置昵称
    public function setname(){
        $phone_user    = parent::loginUser('/Login/Login/login');
        $this->assign('username',$phone_user['username']);
            echo $this->fetch();

    }


//    修改昵称
    public function updatename(){
        $phone_user = parent::loginUser('/Login/Login/login');
            if(!empty(input(''))){
                $arr['flag']=1;
                $map['username']=input('username');
                $username=Db('user')->where($map)->select();
                if(!$username){
                    $data['username']=input('username');
                    $row=Db('user')->where('phone',session('phone'))->update($data);
                    if($row !== false){
                        session('username',input('username'));
                    }else{
                        $arr['flag']=0;
                    }
                }else{
                    $arr['flag']=-1;
                }
              return json($arr);
            }

    }


//    设置头像
    public function setface(){
            $phone_user = parent::loginUser('/Login/Login/login');
            $this->assign('user',$phone_user);
            echo $this->fetch();

    }


//    修改头像
    public function updataface(){
        $arr['flag']=0;
        $user=Db('user');
        if(session('?phone')){
            $map['phone']=session('phone');
            $phone_user=Db('user')->where($map)->find();
            $del_face=$phone_user['face'];
            $del_face=substr($del_face , 0 , -1);
            $face_file='./Public/img/face/'.$del_face;
            $file = request()->file('file');
                if (isset($file)) {
                    $info = $file->move(ROOT_PATH . '/public/Public/img/face/');
                    if ($info) {
                        // 成功上传后 获取上传信息
                        $a              = $info->getSaveName();
                        $filep          = str_replace("\\", "/", $a);
                        $filepath       = '/Public/img/face/' . $filep;
                        $d['f_file']    = $filepath;
                        $data['face']   = $d['f_file'];
                        session('face',  $data['face']);
                    } else {
                        echo $file->getError();
                    }
                }
                $row=Db('user')->where('phone',session('phone'))->update($data);
                if ($row !== false) {
                    $arr['flag']=1;
                }

        }
             return json($arr);
    }



//    发送邮件
    public function verifyemail(){
            $phone_user = parent::loginUser('/Login/Login/login');
            if(input('email')){
                $url='http://'.$_SERVER['HTTP_HOST'].'/master/demo/EmailVerify.php';
                $data_val['email']=input('email');
                $data_val['phone']=session('phone');
                $data_val['link']='http://'.$_SERVER['HTTP_HOST'].'/personal/userinfo/EmailSuccess/email/'.input('email').'/order/'.$data_val['phone'].'/stamp/'.time().'/active/'.$phone_user['uniqid'];
                return php_post($url, $data_val);
            }else{
                $this->assign('user',$phone_user);
                echo $this->fetch();
            }

    }


//    邮件发送成功
    public function EmailSuccess(){
        if(input()){
            if((time()-intval(input('stamp')))/60/60 <= 24){
                $user=Db('user');
                $input=input();
                $map['phone']=input('order');
                $phone_user=Db('user')->where($map)->find();
                if($phone_user['uniqid']==input('active')){
                    if(empty($phone_user['email'])){
                        $data['email']=$input['email'];
                        $row=Db('user')->where("phone",$input['order'])->update($data);
                        if($row!==false){
                            $this->assign('emailverify','success');
                            echo $this->fetch();
                        }else{
                            $this->assign('emailverify','error');
                           echo  $this->fetch();
                        }
                    }else{
                        $this->assign('emailverify','warning');
                       echo  $this->fetch();
                    }
                }else{
                    echo "<center><img src='/Public/img/404.gif'></center>";
                }
            }else{
                echo '验证邮件超时，请重新申请邮箱认证！';
            }
        }else{
            echo "<center><img src='/Public/img/404.gif'></center>";
        }
    }


//    设置密码
    public function setpwd(){
            $phone_user = parent::loginUser('/Login/Login/login');
            $user=Db('user');
            $record=Db('record');
            $record_map['body']=$phone_user['id'];
            $user_record=$record->where($record_map)->order('trans_time desc')->limit(8)->select();
            echo $this->fetch();

    }


//    修改密码
    public function updatepwd(){
        if(!empty(input('post.'))){
            $arr['flag']=1;
            $user=Db('user');
            $map['phone']=session('phone');
            $user_row=Db('user')->where($map)->select();
            if(sha1($_POST['old_pwd'])==$user_row[0]['password']){
                $new_pwd=sha1($_POST['new_pwd']);
                $row=Db('user')->execute("UPDATE yt_user SET password='".$new_pwd."' WHERE phone=".session('phone'));
                if($row !== false){
                    $_SESSION = array();
                }else{
                    $arr['flag']=0;
                }
            }else{
                $arr['flag']=-1;
            }
            return json($arr);
        }
    }


//    交易密码
    public function dealpwd(){
            $phone_user = parent::loginUser('/Login/Login/login');
            $this->assign('user',$phone_user);
            echo $this->fetch();

    }


//    修改交易密码
    public function updatedealpwd(){
        if(!empty(input('post.'))){
            $arr['flag']=1;
            $user=Db('user');
            $map['phone']=session('phone');
            $user_row=Db('user')->where($map)->select();
            if(sha1($_POST['login_pwd'])==$user_row[0]['password']||sha1($_POST['deal_pwd'])==$user_row[0]['deal_password']){
                $new_deal=sha1(input('new_deal'));
                $row=Db('user')->execute("UPDATE yt_user SET deal_password='".$new_deal."' WHERE phone=".session('phone'));
                if($row === false){
                    $arr['flag']=0;
                }
            }else{
                $arr['flag']=-1;
            }
           return json($arr);
        }
    }

}
