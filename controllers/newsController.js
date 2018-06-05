const newsService = require('../service/newsService')
const util = require('../util/util');


module.exports = {
    getNewsClass(req,res,next){
      newsService.getNewsClass().then((data)=>{
        util.responseJONS(res,{
            code:1,
            msg:'查询成功',
            data:data
        })
      })
    },
    delectNewsClassByid(req,res,next){
      const params = req.body || req.query;
      newsService.delectNewsClassByid(params).then((data)=>{
        if(data.affectedRows>0){
          util.responseJONS(res,{
              code:1,
              msg:'操作成功',
          })
        }else{
          util.responseJONS(res,{
            code:0,
            msg:'操作失败！',
          })
        }
        
      })
    },
    add(req,res,next){
      const params = req.body || req.query;
      newsService.add(params).then((data)=>{
        util.responseJONS(res,{
            code:1,
            msg:'操作成功',
        })
      })
    }
}