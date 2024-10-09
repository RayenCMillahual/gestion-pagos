const Payment = require('../models/Payment');
const upload = require('../middlewares/upload');

// Función para crear un pago
const createPayment = async (req, res) => {
  const { amount, userId } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Verificar si se subió un archivo
  if (!req.file) {
    return res.status(400).json({ message: 'El archivo de recibo es obligatorio' });
  }

  try {
    // Crear el pago en la base de datos
    const payment = await Payment.create({
      amount,
      userId,
      receipt: req.file.path // Guarda la ruta del archivo en la base de datos
    });

    // Responder con el pago creado
    res.status(201).json(payment);
  } catch (error) {
    // Manejo de errores en caso de que la creación falle
    console.error('Error al crear el pago:', error);
    res.status(500).json({ message: 'Error al crear el pago' });
  }
};

// Función para obtener los pagos del usuario
const getUserPayments = async (req, res) => {
  const { page = 1, limit = 10, userId } = req.query; // Obtener los parámetros de la consulta
  const offset = (page - 1) * limit; // Calcular el offset para la paginación

  try {
    const payments = await Payment.findAndCountAll({
      where: { userId }, // Filtrar por userId
      limit: parseInt(limit), // Límite de pagos por página
      offset, // Offset para la paginación
      order: [['createdAt', 'DESC']] // Ordenar los pagos por fecha de creación
    });

    // Enviar los resultados
    res.json({ data: payments.rows, total: payments.count });
  } catch (error) {
    // Manejo de errores en caso de que la búsqueda falle
    console.error('Error al obtener los pagos:', error);
    res.status(500).json({ message: 'Error al obtener los pagos' });
  }
};

module.exports = { createPayment, getUserPayments };
