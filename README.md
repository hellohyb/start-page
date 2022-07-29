# start-page
导航起始页

> 一时兴起，想自己做个简洁美观的起始页，还有就是重温一下vue，断断续续做了2天左右，时间加起来可能用了一天左右，其中构思如何对textarea文本域实现下划线笔记本效果花了比较长时间，由于考研复习就没继续往下做了，目前完成了简单的搜索（百度搜索），便笺以及切换壁纸功能。后面如果有时间的话还会做下去。

## 总体效果
![总体效果](https://pic.imgdb.cn/item/62e3c0d3f54cd3f937315b01.jpg)
## start
```shell
## 使用前先对客户端（my-app）和服务端(server)安装依赖
npm install

## 服务端启动
npm run server

## 客户端启动
npm run dev
```
## 所用到的技术
前端(my-app)：vue3 + vite + typescript + tailwindcss
后端(server)：node.js express
数据库：mysql 

数据库相关内容：

各类api接口或者其他地址:

|  api接口名称 | 接口地址 | 返回数据(例) |
| --- | --- | --- |
| 一言api | [https://v1.jinrishici.com/all.json](https://v1.jinrishici.com/all.json) | 古诗词内容，作者，分类 |
| 壁纸分类 | [http://wp.birdpaper.com.cn/intf/getCategory](http://wp.birdpaper.com.cn/intf/getCategory) | 各种壁纸分类 |
| 壁纸内容 | [http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=填写id号&pageno=页数&count=](http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${id}&pageno=1&count=100)数量 | 根据壁纸分类得到id，然后再获取相对应的壁纸。
 |
| 百度搜索 | [http://www.baidu.com/s?wd=](http://www.baidu.com/s?wd=)搜索内容 | 跳转搜索页面 |

功能描述
一、便笺
![功能展示](https://pic.imgdb.cn/item/62e3c163f54cd3f93734b92a.jpg)
![展示2](https://pic.imgdb.cn/item/62e3c1aff54cd3f93736649b.jpg)
实现功能：1、新建便笺  2、编辑内容 3、实时保存至数据库、4、删除功能
二、搜索：简单实现了搜索功能
三、壁纸：
![壁纸](https://pic.imgdb.cn/item/62e3c2cff54cd3f9373cde03.jpg)
实现功能：1、根据pai获取分类信息、分类详细壁纸 2、鼠标点击设置壁纸。3、图片使用懒加载方式进行展示，图片过多以免造成网络堵塞。
其中当前壁纸信息放在了session里。
四、其他：实时展示当前时间。
......无了
