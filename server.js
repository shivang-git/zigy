const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const port = 3000;
require('ejs')
const app = express();
const server = http.createServer(app);
const swaggerui = require('swagger-ui-express');
const swaggerjsdocument = require('swagger-jsdoc');

const io = socketio(server);
app.set('view engine','ejs')
app.use(express.static('public'));

app.get('/1',(req,res)=>{
    io.on('connection', function(socket) {
        socket.on('text', function(data) {
          io.emit('text', data);
        });
      });
    res.render('1')
})

app.get('/2',(req,res)=>{
    res.render('2')
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Swagger API documentation setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation for real-time data',
            version: '1.0.0',
            description: 'API endpoints to send real-time data and receive on other endpoint',
        },
    },
    apis: ['swagger.js'],
};

const Specification = swaggerjsdocument(swaggerOptions);
app.use('/api-docs', swaggerui.serve, swaggerui.setup(Specification));