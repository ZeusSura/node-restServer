const express = require("express");
const app = express();
app.use(require("./UsuarioController"));
app.use(require("./LoginController"));

module.exports = app;
