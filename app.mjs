
import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import router from './src/routes/superHeroRoutes.mjs';


const app = express();
const PORT = process.env.PORT || 3000 ;


app.use(express.json());


connectDB();


app.use('/api', router);


app.use((req, res) => {
  res.status(404).send({mensaje : 'ruta no encontrada'} );
});


app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});