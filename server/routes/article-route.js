const router = require('express').Router()
const articleController = require('../controllers/article-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer = require('../middlewares/multer')
const gcsMiddlewares = require('../middlewares/googleCloudStorage')
const googleVision = require('../middlewares/google-vision')

router.use(authentication)
router.post('/', multer.single('photo'), gcsMiddlewares.sendUploadToGCS, googleVision, articleController.create)
router.get('/', articleController.showAll)
router.get('/user', articleController.showMine)
router.get('/likes', articleController.showLikes)
router.get('/:id', articleController.showOne)
router.put('/:id', multer.single('photo'), gcsMiddlewares.sendUploadToGCS, googleVision, articleController.update)

router.delete('/:id', authorization, articleController.delete)
module.exports = router