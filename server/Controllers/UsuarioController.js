const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../Models/Usuario");
const {verificarToken,verificarAdminRole}=require('../MiddleWare/Autentication')

app.get("/usuario",verificarToken ,function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 0;
  limite = Number(limite);
  Usuario.find({estado:true},'nombre email estado google role img')
    .limit(limite)
    .skip(desde)
    .exec((error, usuarios) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      } else {
        Usuario.count({},(error,conteo)=>{
          res.json({
            ok:true,
            usuarios,
            conteo: conteo
          })
        })
      }
    });
});

app.post("/usuario", [verificarToken,verificarAdminRole] ,(req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });
  usuario.save((error, usuarioDB) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    } else {
      return res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  });
});

app.put("/usuario/:id",[verificarToken,verificarAdminRole] , (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["email", "nombre", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
      context: "query",
    },
    (error, usuarioDB) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      } else {
        return res.json(usuarioDB);
      }
    }
  );
});

app.delete("/usuario/:id",verificarToken , (req, res) => {
  let id =req.params.id;
  let cambiarEstado ={
    estado:false
  }
  Usuario.findByIdAndUpdate(id,cambiarEstado,{new:true},(error,usuarioDeleted)=>{

    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    } 
    if(usuarioDeleted===null)
    {
      return res.status(400).json({
        ok: false,
        error:{
          message:'El usuario no existe'
        }
      });
    }
    return res.status(400).json({
      ok: true,
      usuarioDeleted,
    });
  })
});

module.exports = app;
