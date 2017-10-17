<?php
/*
 * 首页模块
 */
namespace app\agent\controller;
use app\login\controller\Base;
use app\info\model\Bg;
use app\info\model\Picture;
use app\info\model\News;
use think\Session;
use think\Rsa;
class Index extends Base {
	//首页函数
	public function index() {
		
		//轮播图
		$bg   = Bg::bg();
		$size = Bg::getcount();
		
		$this->assign('bg',$bg);
		$this->assign('left',$size-1);
		
		//盈透风采
		$pictures = Picture::indexPicture(3);
		$this->assign('pictures',$pictures);
		
		//新闻
		$article = News::indexNews(3);
		$this->assign('article',$article);
		
		//手机新闻
		$mt_news = News::indexNews(5);
		$this->assign('mt_news',$mt_news);
		
		echo $this->fetch();
	}
}
