class Persona
{
    id = 0;
    nombre = "";
    apellido = "";
    edad = 0;
    constructor(id,nombre,apellido,edad)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    toString()
    {
        let mostrar = "nombre :" + this.nombre + " apellido :" + this.apellido + " edad : " + this.edad;
        return mostrar;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


class Empleado extends Persona
{
    sueldo = 0.0;
    ventas = 0.0;
    constructor(id,nombre,apellido,edad,sueldo,ventas)
    {
        super(id,nombre,apellido,edad);
        this.sueldo = sueldo;
        this.ventas = ventas;
    }
    toString()
    {
        return super.toString() + " sueldo : " + this.sueldo + " ventas : " + this.ventas;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}

class Cliente extends Persona
{
    compras = 0.0;
    telefono = "";
    constructor(id,nombre,apellido,edad,compras,telefono)
    {
        super(id,nombre,apellido,edad);
        this.compras = compras;
        this.telefono = telefono;
    }
    toString()
    {
        return super.toString() + " compras : " + this.compras + " telefono : " + this.telefono;
    }
    toJson()
    {
        return JSON.stringify(this.toString());
    }

}


let empleado1 = new Empleado(1,"Marcelo","Luque",45,15000,2000);
let empleado2 = new Empleado(2,"Ramiro","Escobar",35,6000,1000);
let empleado3 = new Empleado(3,"Facundo","Cairo",30,500,15000);
let cliente1 = new Cliente(4,"Fernando","Nieto",18,8000,"152111131");
let cliente2 = new Cliente(5,"Manuel","Loza",20,50000,"42040077");
let cliente3 = new Cliente(666,"Nicolas","Serrano",23,7000,"1813181563");


//console.log( empleado1.toString() );
//console.log( cliente2.toJson() );






