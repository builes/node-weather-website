const express = require("express");
const path = require("path");

//
const hbs = require("hbs");

//Asi vemos la ruta en la cual esta este archivo
console.log(__dirname);

//Esto siempre debemos de hacerlo cuando vamos a montar un servidor con express
const app = express();

//Esto lo hacemos en caso de que en la carpeta que vayamos a tener a las vistas no se llame views
//const viewsPath = path.join(__dirname, '../templates')
// app.set('views', viewsPath)

//Asi configuramos el modulo hbs con express
//hdbs es un nodulo de plantillas dinamicas basado en handlebar
app.set("view engine", "hbs");

//Asi estemos trabajando con archivos dinamicos dejamos configurada esta ruta para que acceda a las imagenes, archivos css y js que estan en la carpeta public
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//cuando vamos a mostrar archivos dinamicos usamos el metodo render
//la carpeta donde ponemos las vitas se debe de llamar views para que esto funcione
app.get("/", (req, res) => {
  //el primer argumento de render es el nombre de la vista que deseamos mostrar
  //El segundo argumento de render(opcional) es un objeto que contiene todos los valores a los que la vista puede acceder
  res.render("index", {
    title: "Weather App",
    name: "Mauricio",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Mauricio" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "help", name: "Mauricio" });
});

//Asi iniciamos el server
app.listen(3000, () => {
  console.log("server running");
});
