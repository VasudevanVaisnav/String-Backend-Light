const http = require('http');
const app = require('./app');
http.createServer(app).listen(2021,()=>{
  console.log("server started at 2021")
});