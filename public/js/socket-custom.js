var socket = io();

let params =  new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
   window.location = 'index.html';
   throw new Error('El nombre y la sala son necesarios'); 
}

var usuario = {
      nombre : params.get('nombre'),
      sala : params.get('sala')
}



socket.on('connect', function() {  

    socket.emit('chat', usuario , function(res) {
        console.log(res);
    });
});


socket.on('crearMensaje', function (data )  { 
    console.log('data');

    console.log(data);
 })
//escuchat activos
 socket.on('listaActivos' , function(data) {
 
    console.log('estos son los activos');
    console.log(data);
   
})

socket.on('mensajePrivado' , function(data){
 console.log(data);
});
// socket.emit('mesajePrivado' , {para: '' , mensaje : ''});
//socket.emit('crearMensaje' , {mensaje: 'hola a todos'});
// escuchar
// socket.on('disconnect', function() {
//     console.log('Perdimos conexión con el servidor');
// });
// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// })
// // Escuchar información
// socket.on('enviarMensaje', function(mensaje) {
//     console.log('Servidor:', mensaje);
// });