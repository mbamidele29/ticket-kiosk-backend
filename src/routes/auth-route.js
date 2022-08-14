const router=require('express').Router();
const service=require('../app/services/auth-service');

router.post('/login', service.login);
router.post('/register', service.register);
router.get('/verify', service.verifyUser);
router.post('/password', service.createPassword);

module.exports=router;