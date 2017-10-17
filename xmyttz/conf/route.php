<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
        '__alias__' => [
    	'XmyttzAdmin/XmyttzAdmin'	=> 'adminlogin/Login',
    	'XmyttzAdmin/XmyttzAdmin'	=> 'base/Admin',
    	
    	//旧开户链接路由转换
    	'Index' => 'index/Error',
    	'Agent' => 'agent/Error',
    	
    	//新开户链接路由转换
    	'regxmyttz' => 'login/Register/register',
    	'regagent' => 'agent/Register/register'
    ],
];
