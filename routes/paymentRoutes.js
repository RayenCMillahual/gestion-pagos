const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createPayment, getUserPayments } = require('../controllers/paymentController');

// Ruta para crear un nuevo pago
router.post('/payment', createPayment); // Solo admins
// Ruta para obtener los pagos del usuario
router.get('/payments', getUserPayments); // Para usuarios, ver sus pagos

// Ruta para subir recibos
router.post('/payments/upload-receipt', upload.single('receipt'), (req, res) => {
  if (req.file) {
    // Aquí puedes crear el pago en la base de datos si es necesario
    res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
  } else {
    res.status(400).json({ message: 'Error al subir el archivo' });
  }
});

module.exports = router;
