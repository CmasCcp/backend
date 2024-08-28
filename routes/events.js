
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();


// obtener eventos
router.use(validarJWT);


router.get('/', getEventos);

// crear un evento
router.post('/', [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicio es obligatorio").custom(isDate),
    check("end", "Fecha termino es obligatorio").custom(isDate),
    validarCampos
], crearEvento)

// actualizar evento
router.put('/:id', actualizarEvento)

// Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;