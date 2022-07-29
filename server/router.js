let express = require('express');
let router = express.Router();
const conn = require('./db');

//查询数据
// router.get('/api/getContent', (req, res) => {
//     let sqlStr = 'select * from notemessage';
//     conn.query(sqlStr,(err,results) => {
//         if(err){
//             res.json({code:1,msg:'获取数据失败'})
//         }else{
//             res.json({code:0,content:results})
            
//         }
//     })
// });

module.exports = router