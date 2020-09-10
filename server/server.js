const express = require("express");
const bodyParser = require('body-parser');
require('./config/config')

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get("/usuario", function (req, res) {
  res.json('getUsuario');
});
app.post("/usuario",(req,res)=>{
    let body = req.body
    res.json({"body":body});
})
app.put("/usuario/:id",(req,res)=>{
    let id  = req.params.id;
    res.json('putUsuario: '+id);
})
app.delete("/usuario",(req,res)=>{
    res.json('deleteUsuario');
})

app.listen(process.env.PORT , () => {
  console.log("Escuchando puerto 3000");
});
