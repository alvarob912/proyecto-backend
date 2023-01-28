const express = require("express")
const apiRoutes = require("./routes/app.routers")
const handlebars = require("express-handlebars")
const path = require('path')
const viewsRoutes = require('./routes/views/views.router')
const {Server} = require("socket.io")
const mongoose = require ("mongoose");

const PORT = process.env.PORT || 8080; 
const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use("/api", apiRoutes)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', viewsRoutes)
app.use('/statics', express.static(path.resolve(__dirname, './public')))
mongoose.set('strictQuery', false);


const httpServer = app.listen(PORT, () => {
    console.log("Server up and running in port", PORT)
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    app.set('socket', socket)
})

mongoose.connect("mongodb+srv://admin:12345@ecommerce.koayiwg.mongodb.net/ecommerce?retryWrites=true&w=majority",(err)=>{
    if(err) return console.log(`Hubo un error al conectarse a la base de datos ${err}`);
    console.log("conexion a la base de datos exitosa")
});