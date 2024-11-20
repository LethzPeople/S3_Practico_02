import express from 'express';
import { 
    obtenerTodosLosSuperHeroesController, 
    insertarSuperHeroesController, 
    editarSuperHeroesController, 
    borrarSuperHeroePorIdController 
} from '../controllers/superheroesController.mjs';
import { validarSuperheroe } from '../validators/superHeroeValidator.mjs'; // Importar el validador

const router = express.Router();

// Ruta para obtener todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController);

// Ruta para insertar un superhéroe con validaciones
router.post('/heroes', validarSuperheroe, insertarSuperHeroesController);

// Ruta para editar un superhéroe con validaciones
router.put('/heroes/edit/:id', validarSuperheroe, editarSuperHeroesController);

// Ruta para borrar un superhéroe por ID
router.delete('/heroes/delete/:id', borrarSuperHeroePorIdController);

export default router;
