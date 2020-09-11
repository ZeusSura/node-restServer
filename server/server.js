require("./config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Entorno 
const nube = 'mongodb+srv://Admin:D2imC9134fhQ5FMo@cluster0.938gl.mongodb.net/Curso'
const local = 'mongodb://localhost:27017/Curso'


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//EndPoints 
app.use(require("./Controllers/UsuarioController"));




//================Conexion a la base de datos=========================
mongoose.connect(nube,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  },
  (error) => {
    if (error) throw error;
    console.log("base de datos online");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando el puerto ${process.env.PORT}`);
});
