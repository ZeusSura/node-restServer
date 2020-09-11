// =============
// Puerto
//=============
process.env.PORT = process.env.PORT || 3000

// =============
// Variable de entorno
//=============

process.env.MONGO_URI = process.env.MONGO_URI;

// =============
// Vencimiento del token
//=============

process.env.EXPIRACION = 1000*60*60*24

// =============
// SEED DEL TOKEN
//=============
process.env.SEMILLA_PROD = process.env.SEMILLA_PROD || 'esta-es-una-semilla-desarrollo'
