<?php
namespace app\XmyttzAdmin\controller;
use think\Controller;
class XmyttzAdmin extends Controller {
	public function admin() {
		getAlert(null,'/base/Admin/admin');
	}
	
	public function login() {
		getAlert(null,'/adminlogin/Login/login');
	}
}