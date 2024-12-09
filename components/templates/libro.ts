export class libro {
    codigo:number;
    tipo:string;
    idcategoria:number;
    editorial:string;
    nombre:string;
    autor:string;
    aniopublicacion:number;
    estado:string;
    categoria:string;

    constructor(cod:number, tip:string, idcat:number, edi:string, nom:string, aut:string, aniop:number, est:string, cat:string) {
        this.codigo = cod;
        this.tipo = tip;
        this.idcategoria = idcat;
        this.editorial = edi;
        this.nombre = nom;
        this.autor = aut;
        this.aniopublicacion = aniop;
        this.estado = est;
        this.categoria = cat;
    }
}