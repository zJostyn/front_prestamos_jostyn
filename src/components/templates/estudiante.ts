export class estudiante {
    cedula:string;
    nombre:string;
    apellido:string;
    sexo:string;
    fechanacimiento:string;
    sancionado:string;

    constructor(ced:string, nom:string, ape:string, sex:string, fecnac:string, san:string) {
        this.cedula =ced;
        this.nombre = nom;
        this.apellido = ape;
        this.sexo = sex;
        this.fechanacimiento = fecnac;
        this.sancionado = san;
    }
}