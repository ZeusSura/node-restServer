require("./config/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Entorno 
const nube = process.env.MONGO_URI
const local = 'mongodb://localhost:27017/Curso'


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//RUTAS
app.use(require("./Controllers/Index"));

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