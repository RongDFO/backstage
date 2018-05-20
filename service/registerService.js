const registerDao = require('../dao/registerDao');


module.exports={
    async register(params){
        try{
            const result = await registerDao.getUserByUsername(params);
            if(result.length>0){
                code = {
                    code : 0,
                    msg : '用户名重复'
                }
                return code
            }
            await registerDao.register(params); //注册
                code = {
                    code : 1,
                    msg : '操作成功'
                }
             return code
        }catch(err){
            throw err
        }
    }
}