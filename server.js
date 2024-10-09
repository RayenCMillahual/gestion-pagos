const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const paymentsRoutes = require('./routes/paymentRoutes');
const sequelize = require('./config/database');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/users', userRoutes);
app.use('/api/payments', paymentsRoutes);

// Configuración de Socket.IO
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Admin conectado');
  
  socket.on('newPayment', (data) => {
    io.emit('updatePayments', data); // Enviar a todos los admins conectados
  });
});

// Sincronización de la base de datos
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync failed:', err));
  process.exit(1);
// Escucha del servidor
server.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
