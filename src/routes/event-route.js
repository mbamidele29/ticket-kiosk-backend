const router=require('express').Router();
const service=require('../app/services/event-service');

const fileUpload=require('../app/utils/file-upload');

router.get('/', service.get);
router.get('/collections', service.get);
router.get('/:id', service.getOne);
router.post('/', service.create);
router.post('/banner', fileUpload.single('banner'), service.upload);

module.exports=router;