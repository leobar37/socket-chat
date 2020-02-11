  
 
 class Usuarios {

    constructor() {
       this.personas = [];
    }
    agregarPersonas(id, nombre ,sala) {
      let persona = { id , nombre ,sala};

     this.personas.push(persona);
     
      return this.personas;
    }

    getPersona(id) {
    let persona = this.personas.find( persona => persona.id === id);

      return persona;
    }
    getPersonas() {
         return this.personas;
    }

    getPersonasPorSala(sala){
     let personasSala =  this.personas.filter(persona =>{ 
      return  persona.sala === sala;
     })
     return personasSala;
    }
    borrarPersona(id){
         let personaBorrada = this.getPersona(id);
         this.personas =  this.personas.filter(persona => {
             return persona.id != id;
         })

         return personaBorrada;
    }
         
 }

 module.exports = {
      Usuarios
 }