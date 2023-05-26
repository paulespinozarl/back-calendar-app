/*  
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require( 'express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')


router.post(
    '/new', 
    [ //middelweres
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password ser de 6 caracteres').isLength({ min: 6}),
    validarCampos
    ],
     crearUsuario
);

router.post(
    '/',
    [ //middelweres
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password ser de 6 caracteres').isLength({ min: 6}),
    validarCampos
    ],
    loginUsuario
);

router.get(
    '/renew',
    [
        validarJWT
    ],
     revalidarToken);

module.exports = router;