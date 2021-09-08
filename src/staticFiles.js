const express = require("express");
const path = require("path");

//Asi vemos la ruta en la cual esta este archivo
console.log(__dirname);

//el modulo path nos sirve para trabajr con ruta
const publicDirectoryPath = path.join(__dirname, "../public");

//Esto siempre debemos de hacerlo cuando vamos a montar un servidor con express
const app = express();

//Usamos esto cuando vamos a trabajar con archivos estaticos
//Como esto esta primero que el app.get('') esa funcion nunca se ejecutara
//express trabaja hasta que encuentra una coincidencia para la ruta
//Con esto accede a todas las rutas dentro de la carpeta,
app.use(express.static(publicDirectoryPath));

//el metodo get recibe dos argumentos, la ruta y una funcion donde decimos que queremos hacer en la ruta
//req hace referencia a la solicitud y res a la respuesta que vamos a dar
//Aca no se ejecutaria esta funcion ya que arriba ya encontro la ruta para la pagina ppal
app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.get("/weather", (req, res) => {
  res.send({ forecast: 23, location: "Medellin" });
});

//Asi iniciamos el server
app.listen(3000, () => {
  console.log("server running");
});
