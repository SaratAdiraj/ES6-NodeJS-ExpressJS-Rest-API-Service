import express from 'express';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`User API running at http://localhost:${PORT}/api \nUser API docs running at http://localhost:${PORT}/api-docs`);
});
