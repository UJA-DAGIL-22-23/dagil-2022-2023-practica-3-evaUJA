/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Microservicio MS Plantilla: acerca de",
    autor: "Eva",
    email: "etm00016@red.ujaen.es",
    fecha: "28/03/2023"

}
// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "POSICION": "### POSICION ###",
    "FECHADENACIMIENTO": "### FECHADENACIMIENTO ###",
    "CASAHODWARTS": "### CASAHODWARTS ###",
    "COPASMUNDIALES": "###COPASMUNDIALES ###",
    "TIPOESCOBA":"###TIPOESCOBA ###"

}
Plantilla.cerear = function ( num ) {
    return (num<10?"0":"")+num

}
// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="10%">Nombre</th>
                        <th width="10%">Apellidos</th>
                        <th width="10%">Posicion</th>
                        <th width="20%">FechaDeNacimiento</th>
                        <th width="10%">cadaHodwarts</th>
                        <th width="20%">CopasMundiales</th>
                         <th width="10%">TipoEscoba</th>
                   

                    </thead>
                    <tbody>
    `;

// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera2 = `<table width="100%" class="listado-personas">
                    <thead>
                    
                        <th width="100%">Nombre</th>
   
                    </thead>
                    <tbody>
    `;


// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Mensaje/a</b>: ${datosDescargados.mensaje}</li>
        <li><b>Autor </b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha de Nacimiento </b>: ${datosDescargados.fecha}</li>
  
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/Quidditch/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/Quidditch/acercade", this.mostrarAcercaDe);
}
/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Plantilla.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas con todos los datos ", msj)
}

Plantilla.imprimeNombreMuchasPersonas = function (vector) {
     //console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera2
    if (vector && Array.isArray(vector)) {
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza2(e))
    }
    msj += Plantilla.plantillaTablaPersonas.pie
     // Para comprobar lo que hay en vector
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas solo con su nombre", msj)
}

Plantilla.imprimeOrdenadorAlfabeticamente = function(vector,campo){


        //console.log(vector) // Para comprobar lo que hay en vector

        // Compongo el contenido que se va a mostrar dentro de la tabla
        let msj = Plantilla.plantillaTablaPersonas.cabecera
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a,b)
        {
            let campoA = null; //= a.data[campo].toUpperCase();
            let campoB = null;  //= b.data[campo].toUpperCase();
            if(campo == 'fechaNacimiento'){
                campoA = a.data[campo].annio + "" +  Plantilla.cerear(a.data[campo].mes) + ""+ Plantilla.cerear(a.data[campo].dia)
                campoB = b.data[campo].annio + "" +   Plantilla.cerear(b.data[campo].mes) + ""+ Plantilla.cerear(b.data[campo].dia)
            }else{
                campoA = a.data[campo].toUpperCase();
                campoB = b.data[campo].toUpperCase();
            }
            if (campoA < campoB) {
                return -1;
            }
            if (campoA > campoB) {
                return 1;
            }
            return 0;
        });
        vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    }
        msj += Plantilla.plantillaTablaPersonas.pie
        // Para comprobar lo que hay en vector
        // Borro toda la info de Article y la sustituyo por la que me interesa
        Frontend.Article.actualizar("Listado de personas ordenadas alfabeticamente solo con su nombre", msj)

}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}
Plantilla.plantillaTablaPersonas.actualiza2 = function (persona) {
    return Plantilla.sustituyeTags2(this.cuerpo2, persona)
}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Plantilla.plantillaTags.FECHADENACIMIENTO, 'g'), persona.data.fechaNacimiento.annio + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.CASAHODWARTS, 'g'), persona.data.casaHogwarts)
        .replace(new RegExp(Plantilla.plantillaTags.COPASMUNDIALES, 'g'), persona.data.copasMundiales)
        .replace(new RegExp(Plantilla.plantillaTags.TIPOESCOBA, 'g'), persona.data.tipoEscoba)

}
Plantilla.sustituyeTags2 = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)

}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn,campo) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/Quidditch/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data,campo)

    }
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listar2 = function () {
    Plantilla.recupera(Plantilla.imprimeNombreMuchasPersonas);
}

Plantilla.listar3 = function (campo) {
    Plantilla.recupera(Plantilla.imprimeOrdenadorAlfabeticamente,campo);
}

Plantilla.l
// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        <td>${Plantilla.plantillaTags.FECHADENACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.CASAHODWARTS}</td>
        <td>${Plantilla.plantillaTags.COPASMUNDIALES}</td>
        <td>${Plantilla.plantillaTags.TIPOESCOBA}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo2 = `
    <tr title="${Plantilla.plantillaTags.ID}">
      
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
      
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

Plantilla.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}
/**
 * Función que recuperar todas las personas llamando al MS Personas.
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/Quidditch/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}
/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.plantillaFormularioPersona = {}
/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}