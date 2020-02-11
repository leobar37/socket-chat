const { io } = require('../server');
const { enviarMensaje} = require('../utilidades/utilidades')
const {Usuarios} =require('../classes/usuarios')
 
let usuarios  =  new Usuarios();
io.on('connection', (client) => {

    client.on('chat', (data , callback) => {      
        if(!data.nombre  || !data.sala){
         return callback( {
            err : true,
            messae: 'Se necesita mandar el nombre'
         });
        }
        let activos=usuarios.agregarPersonas(client.id ,  data.nombre , data['sala']);
        //el callback solo se devuelve al evento 
        //que hizo la peticion  
        //mandar el usuario a una sala
        client.join(data['sala']);
        //evento que avisa  quienes estan conectados al chat
         client.broadcast.to(data['sala']).emit('listaActivos' ,usuarios.getPersonasPorSala(data['sala'])); 
         
        callback(usuarios.getPersonasPorSala(data['sala']))
    })
  
     client.on('crearMensaje' , (data)=>{ 
         
        let persona =  usuarios.getPersona(client.id);
     
         client.broadcast.to(persona['sala']).emit('crearMensaje' ,enviarMensaje(persona['nombre'] , data['mensaje']) );


     });
   client.on('mensajePrivado', data=> {
        let usuario = usuarios.getPersona(client.id);
        let usuariAenviar =  usuarios.getPersona(data['para']);
        /*
    parametros de data
    para=  para quien es el mensaje
    mensaje,
    */
//   console.log('data estructurada');
//   console.log(usuariAenviar);
//   console.log(usuario);
  client.broadcast.to(data.para).emit('mensajePrivado', enviarMensaje(usuario['nombre'],data['mensaje']));

   })

    client.on('disconnect' , ()=> {
       let  usDelete =   usuarios.borrarPersona(client.id);         
        client.broadcast.to(usDelete['sala']).emit('crearMensaje' , enviarMensaje('Admin' , `${usDelete['nombre']} abandono el chat`));
        client.broadcast.to(usDelete['sala']).emit('listaActivos' ,usuarios.getPersonasPorSala(usDelete['sala']) );
    })
    
});  




 