const newsDao = require('../dao/newsDao');
module.exports = {
    async getNewsClass(params){
        const data = await newsDao.getNewsClass(params);
        return data;
    },
    async delectNewsClassByid(params){
        const data = await newsDao.delectNewsClassByid(params);
        return data;
    },
    async add(params){
        const data = await newsDao.add(params);
        return data;
    }
}