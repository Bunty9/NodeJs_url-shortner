const router = require('express').Router();
const passport = require('passport')

router.route('/').get(checkAuthenticated, async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})
  
router.route('/new').post(checkAuthenticated, async (req, res) => {
   try {
       
  const newShortUrl = new ShortUrl(
    {
      owner:req.params.id,
      full: req.body.full,
      short: req.body.short
    });
    await newShortUrl.save();
   } catch (err) {
    res.status(500).send("server error");
   }
})
  
router.route('/:shortURL').get(checkAuthenticated, async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
})



// check if the user is authenticated if not redirect to login , this to block unauthenticated users from accessing the home page
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/api/login')
}
// if the user is authenticated redirect to home page if the login/register page is accessed again
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/api')
    }
    next()
  }
module.exports = router;