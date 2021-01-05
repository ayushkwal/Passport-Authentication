const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('you reach here');
    console.log(req.user);
    if (req.user) {
        res.render('profile', { username: req.user.username, thumbnail: req.user.thumbnail });
    } else {
        res.redirect('/');
    }

})

module.exports = router;