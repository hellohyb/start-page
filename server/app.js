let express = require('express'),
      bodyParser = require('body-parser');

const app = express();
const router = require('./router');
// 设置跨域
app.use(require('cors')());

// 挂载参数处理中间件
app.use(bodyParser.urlencoded({extended:false}));
//处理json格式参数
app.use(bodyParser.json());
app.use('./',router);

//获取时间
//封装时间格式
function setTime(time){
    return time<10?'0' + time:time;
}
var timeStr
setInterval(()=>{
var date = new Date();
var day = setTime(date.getDate());
var year = setTime(date.getFullYear());
var month = setTime(date.getMonth() + 1);
var hour = setTime(date.getHours());
var min  = setTime(date.getMinutes());
var second = setTime(date.getSeconds());
timeStr = year + '-' + month + "-" + day + " " + hour + ":" + min + ":" + second
},1000)

const conn = require('./db');

//查询数据
app.get('/api/getContent', (req, res) => {
    let sqlStr = 'select * from notemsg order by id desc';
    conn.query(sqlStr,(err,results) => {
        if(err){
            console.log(err)
            res.json({code:1,msg:'获取数据失败'})
        }else{
            res.json({code:0,content:results})
        }
    })  
});
//删除数据
app.post('/api/delContent',(req,res) => {
    let sqlStr = `delete from notemsg where id = ${req.body.id}`
    conn.query(sqlStr,(err) => {
        if(err){
            console.log(err)
            res.json({code:1,msg:'删除失败！'})
        }else{
            res.json({code:0,msg:'删除成功！'})
        }
    }) 
})
//编辑数据
app.post('/api/editContent',(req,res) => {
    let sqlStr = `UPDATE notemsg SET title = '${req.body.title}', content = '${req.body.content}', time = '${req.body.time}' where id = ${req.body.id}`
    conn.query(sqlStr,(err,data) => {
        if(err){
            console.log(err)
            res.json({code:1,msg:'更新失败！'})
        }else{
            // console.log('当前id',req.body.id)
            res.json({code:0,content:data})
        }
    }) 
})
//添加数据
app.post('/api/addContent',(req,res) => {
    let sqlStr = `insert into notemsg(title,content,time,oldtime) values('','','${timeStr}','${timeStr}')`
    conn.query(sqlStr,(err) => {
        if(err){
            console.log(err)
            res.json({code:1,msg:'创建失败！'})
        }else{
            res.json({code:0,msg:'创建成功！'})
        }
    }) 
})



app.listen('8081',() => {
    console.log('Server is running on PORT 8081!!!')
});