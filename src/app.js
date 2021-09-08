const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

//asi configuramos el puerto de la app que va a usar jheroku cuando hagamos el deploy
//process.env.PORT || 3000 quiere decir que si process.env.PORT no existe utilice el valor de 3000
const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Asi decimos que nuestra app va a tener partials y dodne estn
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mauricio Builes",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Mauricio Builes" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This i some helpful text",
    title: "Help",
    name: "Mauricio Builes",
  });
});

app.get("/products", (req, res) => {
  //con esto vemos los parametros que el usuario pasa por la url despues de products
  //los valores se retornan en un objeto
  const data = req.query;

  //con esto decimos que si no se envia search en la url haga lo que esta dentro del if
  if (!data.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(data);
  res.send({ products: [] });
});

app.get("/weather", (req, res) => {
  const data = req.query;

  if (!data.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  console.log(data);
  geocode(data.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      latitude,
      longitude,
      (error, { msg, latitudeW, longitudeW } = {}) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            location,
            msg,
            latitudeW,
            longitudeW,
          });
          console.log(location);
          console.log(msg);
          console.log(latitudeW);
          console.log(longitudeW);
        }
      }
    );
  });
});

// help/* coincide con cualquier ruta de esta manera help/loquesea
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mauricio Builes",
    msg: "Help article not found",
  });
});

// * significa que si la ruta buscada no coincide con ninguna de las que estan arriba entonces se ejecuta esta funcion
// * coincide con cualquier ruta puesta en el navegador, por eso debe ir de ultima
//esta funcion debe ser la ultima ruta que se ppnga
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mauricio Builes",
    msg: "Page not found",
  });
});

//Asi iniciamos el server
app.listen(port, () => {
  console.log("server running");
});
