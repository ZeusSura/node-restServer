const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../Models/Usuario");

app.post("/login", (req, res) => {
  let body = req.body;
  Usuario.findOne({ email: body.email }, (error, UsuariDB) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }
    if (!UsuariDB) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Usuario o contraseña incorrecta",
        },
      });
    }
    if (!bcrypt.compareSync(body.password, UsuariDB.password)) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Usuario o contraseña incorrecta",
        },
      });
    }

    let token = jwt.sign(
      {
        usuario: UsuariDB,
      },
      process.env.SEMILLA_PROD,
      { expiresIn: process.env.EXPIRACION }
    );
    res.json({
      ok: true,
      usuario: UsuariDB,
      token
    });
  });
});

module.exports = app;
