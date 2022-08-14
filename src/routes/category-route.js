const router=require('express').Router();
const service=require('../app/services/category-service');

router.get('/', service.get);
router.get('/:id', service.getOne);
router.post('/', service.create);
router.put('/:id', service.update);

module.exports=router;