const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.set("views", viewsPath)

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "akhil kumar",
  })
})
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Akhil kumar",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "your message",
    name: "Akhil kumar",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    })
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({ error })
    }

    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        temprature: forecastData.temperature,
        rain: forecastData.rain,
        location: data.location,
        address: req.query.address,
      })
    })
  })
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    })
  }

  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akhil kumar",
    error: "Help article not found",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akhil kumar",
    error: "page not found",
  })
})

app.listen(port, () => {
  console.log("app is running on port port")
})
