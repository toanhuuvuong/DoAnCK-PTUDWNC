const authentication = require('../services/authentication');

module.exports=server=>{
  const socket = require('socket.io');
  const io = socket(server,{
    path:"/socket"
  });

  io.use(authentication.ensureAuthenticated);

  io.of('/').on('connection',socket=>{
    
  })
}
