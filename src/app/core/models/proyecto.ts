import {Compania} from './compania'

export interface Proyecto{
    id: any;
    centro_costo_id: any;
    nombre: string;
    responsable: string;
    desc_id: string;
    estatus: string;
    activo: boolean;
    fecha_creacion: Date;
    fecha_fin: Date;
    fecha_inicio: Date;
    fecha_modificacion: Date;
    idsempresas: any;
}
