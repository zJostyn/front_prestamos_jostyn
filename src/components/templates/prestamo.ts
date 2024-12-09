export class prestamo {
    idprestamo:number;
    cedula:string;
    codigo:number;
    fechaprestamo:string;
    fechaentrega:string;
    fechadevuelto:string
    
    constructor(idpres:number, ced:string, cod:number, fecpres:string, fecent:string, fechadev:string) {
        this.idprestamo = idpres;
        this.cedula = ced;
        this.codigo = cod;
        this.fechaprestamo = fecpres;
        this.fechaentrega = fecent;
        this.fechadevuelto = fechadev;
    }
}