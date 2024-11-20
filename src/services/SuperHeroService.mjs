import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function insertarSuperHeroes(req, res){
    return await SuperHeroRepository.insertSuperHero(req, res);
}

export async function actualizarSuperHeroes(req, res){
    try {

        return await SuperHeroRepository.editarSuperHeroe(req, res);

    } catch (error) {
        throw new Error("Error en el services al actualizar el superhéroe: " + error.message);
    }
}

export async function borrarSuperHeroePorId(id) {
  try {
      return await superHeroRepository.borrarPorId(id);
  } catch (error) {
      throw error;
  }
}

