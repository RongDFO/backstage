module.exports = {
    getNewsClass:'select * from news_class ORDER BY sort',
    delectNewsClassByid:'DELETE FROM news_class WHERE id=?',
    add:'INSERT INTO news_class(name,sort,`desc`) VALUES (?,?,?)',
}