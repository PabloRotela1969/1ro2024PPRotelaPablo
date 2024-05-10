

class Persona
{
    id = 0;
    nombre = "";
    apellido = "";
    fechaNacimiento = 0;
    constructor(id,nombre,apellido,fechaNacimiento)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }
    toString()
    {
        let mostrar = "nombre :" + this.nombre + " apellido :" + this.apellido + " fechaNacimiento : " + this.fechaNacimiento;
        return mostrar;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


class Ciudadano extends Persona
{
    dni = 0;

    constructor(id,nombre,apellido,fechaNacimiento,dni)
    {
        super(id,nombre,apellido,fechaNacimiento);
        this.dni = dni;
    }
    toString()
    {
        return super.toString() + " dni : " + this.dni ;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

class Extrangero extends Persona
{
    paisOrigen = "";
    constructor(id,nombre,apellido,fechaNacimiento,paisOrigen)
    {
        super(id,nombre,apellido,fechaNacimiento);
        this.paisOrigen = paisOrigen;
    }
    toString()
    {
        return super.toString() + " paisOrigen : " + this.paisOrigen;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

//////////////////////////////////////////////////////////FUNCIONALIDAD//////////////////////////////////////////////////////////


function $(id)
{
    return document.getElementById(id);
}

function crear(tipo)
{
    return document.createElement(tipo);
}

window.addEventListener("load",cargarGrillaYboton);

function tipoEmpleado(elemento,indice,vector)
{
    if(this == 1)
    {
        return elemento.dni > 0;// extranjero
    }
    
    if(this == 2)
    {
        return elemento.dni == 0;// nacional
    }
    if(this == 3)
    {
        return elemento.dni >= 0;// todos
    }
}

 var vector1 =   [
    // son nacionales porque el país de origen es el por defecto y tienen dni
    {"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942,"paisOrigen":""},
    {"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214,"paisOrigen":""},
    {"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612,"paisOrigen":""},
    // son extranjeros porque no tienen dni y está declarado el país
    {"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"dni":0,"paisOrigen":"Paraguay"},
    {"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"dni":0,"paisOrigen":"Brazil"},
    {"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"dni":0,"paisOrigen":"Finlandia"}
];




function filtrarVector()
{
    var combo = $("selector");
    if(combo)
    {
        var seleccionado = combo.options[combo.selectedIndex].value;
        return vector1.filter(tipoEmpleado, seleccionado);

    }
}



function cargarGrillaYboton()
{
    let vector = filtrarVector();
    cargarGrilla(vector);
    agregarBotonAgregar();
}

function cargarGrilla(vector)
{
    let tablaPrincipal = $("tablaPrincipal");
    while (tablaPrincipal.firstChild) 
    {
        tablaPrincipal.removeChild(tablaPrincipal.firstChild);
    }
    // Crear el encabezado de la tabla
    var encabezado = crear('tr');

    if(vector.length > 0)
    {
        Object.keys(vector[0]).forEach(function(clave) 
        {

            if(checkboxTildado(clave))
            {
                var th = crear('th');
                th.textContent = clave;
                
                th.onclick = function() 
                {
                    ordenarPorColumna(clave);
                };
                
                
                encabezado.appendChild(th);
            }
        });

    
    }

    tablaPrincipal.appendChild(encabezado);
    
    // Crear las filas de la tabla
    function crearFilas() {
        // Eliminar filas existentes para simular refresco de grilla
        while (tablaPrincipal.rows.length > 1) 
        {
            tablaPrincipal.deleteRow(1);
        }
        if(vector.length > 0)
        {
            let idFila = 0;
            vector.map(function(objeto) 
            {
                var tr = crear('tr');
                
                Object.keys(objeto).map(function(clave) 
                {
                    if(checkboxTildado(clave))
                    {
                        var td = crear('td');
                        if(clave == "id")
                        {
                            idFila = objeto[clave]; // establezco el id desde el array para toda la fila   
                        }
                        td.textContent = objeto[clave];
                        
                        td.setAttribute("fila",idFila);
                        td.onclick = function() 
                        {
                            let fila = td.getAttribute("fila");
                            mostrarFilaEnFormularioABM(fila);
                            mostrarSeccionABM();
                        };

                        tr.appendChild(td);
                    }
                });
                tablaPrincipal.appendChild(tr);
                
            });

        }
        
    }
    crearFilas();
    
    // Función para ordenar por columna
    function ordenarPorColumna(clave) 
    {
        if(checkboxTildado(clave))
        {

            vector.sort(function(a, b) {
                if (typeof a[clave] === 'number') {
                    return a[clave] - b[clave];
                } else {
                    return a[clave].localeCompare(b[clave]);
                }
            });
            crearFilas();
        }
    }



    
}

function agregarBotonAgregar()
{
    
    let seccionABM = $("botonABM");
    if($("btnAgregar") == null)
    {

        let botonAgregar= crear("button");
        botonAgregar.id = "btnAgregar";
        botonAgregar.className = "boton";
        let textoBoton = document.createTextNode("Agregar");
        botonAgregar.appendChild(textoBoton);
        botonAgregar.addEventListener("click",mostrarSeccionABM);
        seccionABM.appendChild(botonAgregar);
    }
    
}


function mostrarSeccionABM()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "none";
    tablaPrincipal.style.display = "none";
    botonAgregar.style.display = "none";
    seccionABM.style.display = "block";
    $("btnAlta").disabled = false;
    $("abm.id").value = maxId();
    
}
function mostrarSeccionPrincipal()
{
    let seccionCabecera = $("cabecera");
    let seccionABM = $("seccionABM");
    let tablaPrincipal = $("tablaPrincipal");
    let botonAgregar = $("btnAgregar");
    seccionCabecera.style.display = "block";
    tablaPrincipal.style.display = "block";
    botonAgregar.style.display = "block";
    seccionABM.style.display = "none";   
    $("btnAlta").disabled = false; 
    LimpiarRegistroDeVector();
}


function checkboxTildado(clave)
{
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let respuesta = false;
    for(i=0;i<checkboxes.length;i++)
    {
        if (checkboxes[i].checked && checkboxes[i].id == clave) 
        {
            respuesta = true;
            break;
        }
    }
    return respuesta;
}

// recorre el array filtrado calculando la diferencia de los años contra el actual 
// los acumula y con el acumulado calcula el promedio
function recorrerVector()
{
    let vector = filtrarVector();
    let acumulado = 0;
    let promedio = 0.0;
    let campo = $("edadPromedio");

    let suma = vector.reduce(function(acumulado, item)
    {
        let añoActual = new Date().getFullYear();
        return acumulado + (añoActual - parseInt(item.fechaNacimiento.toString().substring(0,4)));
    },0);
    if(suma > 0)
    {
        promedio = ( suma /  vector.length);
        campo.value = promedio;
    }
}

function mostrarFilaEnFormularioABM(fila)
{
    let vector = vector1;
    $("abm.fila").value = fila;
    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            $("abm.id").value = vector[i].id;
            $("abm.id").disabled = true;
            $("abm.apellido").value = vector[i].apellido;
            $("abm.nombre").value = vector[i].nombre;
            $("abm.fechaNacimiento").value = vector[i].fechaNacimiento;
            $("abm.dni").value = vector[i].dni;
            $("abm.paisOrigen").value = vector[i].paisOrigen;
            break;
        }
    }

}





function maxId()
{
    let vector = filtrarVector();
    let cantidadItems = vector.length;
    let maximo = 0;
    let max = vector.reduce(function(maximo, item)
    {
        if(maximo < parseInt(item.id))
        {
            maximo = parseInt(item.id) 
        }
        return maximo;
    },0);
    return ++max;
}



function AgregarRegistroAVector()
{
    
    vector1.push({"id":$("abm.id").value, "apellido":$("abm.apellido").value, "nombre":$("abm.nombre").value, "fechaNacimiento":$("abm.fechaNacimiento").value, "dni":$("abm.dni").value, "paisOrigen":$("abm.paisOrigen").value});

    mostrarSeccionPrincipal();
    cargarGrilla(vector1);
}

function ModificarRegistroDeVector()
{
    let vector = vector1;
    let fila = $("abm.fila").value;
    $("abm.id").disabled = false;
    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            vector[i].apellido = $("abm.apellido").value;
            vector[i].nombre = $("abm.nombre").value;
            vector[i].fechaNacimiento = $("abm.fechaNacimiento").value;
            vector[i].dni = $("abm.dni").value;
            vector[i].paisOrigen = $("abm.paisOrigen").value;
            break;
        }
    }



    LimpiarRegistroDeVector();
    mostrarSeccionPrincipal();
    cargarGrilla(vector);
}

function BajaRegistroDeVector()
{
    let vector = vector1;
    let fila = $("abm.fila").value;
    $("abm.id").disabled = false;

    for( let i = 0; i < vector.length ; i++)
    {
        if(vector[i].id == fila)
        {
            vector.splice(i,1);
            break;
        }
    }

    LimpiarRegistroDeVector();
    mostrarSeccionPrincipal();
    cargarGrilla(vector);

}

function LimpiarRegistroDeVector()
{
    $("abm.fila").value = 0;
    $("abm.id").value = 0;
    $("abm.id").disabled = true;
    $("abm.apellido").value = "";
    $("abm.nombre").value = "";
    $("abm.fechaNacimiento").value = 0;
    $("abm.dni").value = 0;
    $("abm.paisOrigen").value = 0;

}