const jwt = require("jsonwebtoken");

//============================
//         Verificar token
//===========================

let verificarToken = (req, res, next) => {
  let Authorization = req.get("Authorization");

  jwt.verify(Authorization, process.env.SEMILLA_PROD, (error, decode) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error,
      });
    }

    req.usuario = decode.usuario;
    next();
  });
};

let verificarAdminRole = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.json({
      ok: false,
      error: {
        message: "El usuario no es administrador",
      },
    });
  }
};

module.exports = {
  verificarToken,
  verificarAdminRole
};
