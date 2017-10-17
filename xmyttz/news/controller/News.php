<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/18 0018
 * Time: 上午 11:11
 */

namespace app\news\controller;
use app\login\controller\Base;
class News extends Base{
    public function news(){
        $news=Db('news');
        $news_sets=$news->where('del',0)->order('date desc')->paginate(10);
        $show=$news_sets->render();
        $this->assign('news_sets',$news_sets);
        $this->assign('page',$show);
        echo $this->fetch();
    }


    public function news_detail($news_id){
        $news=Db('news');
        $article=$news->find($news_id);
        $content=html_entity_decode($article['content']);
        $time=date('Y-m-d h:i',$article['date']);
        $this->assign('content',$content);
        $this->assign('time',$time);
        $important=$news->where('state=1')->select();
        $this->assign('important',$important);
        echo $this->fetch();
    }
}