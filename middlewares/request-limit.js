import rateLimit from 'express-rate-limit';


// Límite público de peticiones
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
  max: 100, // máximo de 100 requests por IP
  message: 'Has excedido el límite de solicitudes, intenta más tarde.'
});

// Límite más estricto para rutas privadas
export const privateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
  max: 50, // máximo de 50 requests por IP
  message: 'Has excedido el límite de solicitudes en rutas privadas.'
});


