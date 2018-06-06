module.exports = {
    getNewsClass:'select * from news_class ORDER BY sort',
    delectNewsClassByid:'DELETE FROM news_class WHERE id=?',
    add:'INSERT INTO news_class(name,sort,`desc`) VALUES (?,?,?)',
    getNewsDetailList:'SELECT * FROM `news_detail` t1 LEFT JOIN content t2 on t1.news_conten_id = t2.content_id  WHERE t1.status=? and t1.changetime > ? and t1.changetime< ?'
}