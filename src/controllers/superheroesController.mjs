import { obtenerTodosLosSuperHeroes, insertarSuperHeroes, actualizarSuperHeroes, borrarSuperHeroePorId } from '../services/SuperHeroService.mjs';
import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { validationResult } from 'express-validator';


export async function obtenerTodosLosSuperHeroesController(req, res){
    const superheroes = await obtenerTodosLosSuperHeroes();
    const listaRenderizada = renderizarListaSuperheroes(superheroes);
    res.json(listaRenderizada);
}

export async function insertarSuperHeroesController(req, res) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
  }

  try {
      const superhero = await insertarSuperHeroes(req, res);
      const renderizado = renderizarSuperHeroe(superhero);
      res.status(201).send(renderizado);
  } catch (error) {
      console.error("Error en el controlador:", error.message);
      res.status(500).send({ error: "Error al insertar el superhéroe" });
  }
}


export async function editarSuperHeroesController(req, res) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
  }

  try {
      const superheroe = await actualizarSuperHeroes(req, res);
      if (!superheroe) {
          return res.status(404).send({ error: 'Superhéroe no encontrado' });
      }
      const superheroeRenderizado = renderizarSuperHeroe(superheroe);
      res.status(200).send(superheroeRenderizado);
  } catch (error) {
      console.error("Error en el controlador:", error.message);
      res.status(500).send({ error: "Error al actualizar el superhéroe" });
  }
}


export async function borrarSuperHeroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await superHeroRepository.borrarPorId(id);
        if (!superheroe) {
            return res.status(404).send({ error: 'Superhéroe no encontrado' });
        }
        const superheroeRenderizado = renderizarSuperHeroe(superheroe);
        res.status(200).send({
            message: 'Superhéroe eliminado exitosamente',
            superheroe: superheroeRenderizado
        });
    } catch (error) {
        console.error("Error en el controlador:", error.message);
        if (error.message === 'ID no válido') {
            return res.status(400).send({ error: 'ID no válido' });
        }
        res.status(500).send({ error: "Error al borrar el superhéroe" });
    }
}


