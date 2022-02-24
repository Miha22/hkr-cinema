module.exports = function(req, res, next) {
    res.status(404).render('404', {
        layout: 'empty',
        title: 'Page was not found'
    });
};  