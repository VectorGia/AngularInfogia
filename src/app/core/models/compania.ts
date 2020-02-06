export interface Compania{
    id
    id_modelo_neg
    id_centro_costo
    abrev: string;
    nombre: string;
    desc_id: string;
    host: string;
    usuario_etl: string;
    contrasenia_etl: string;
    puerto_compania: string;
    moneda_id: any;
    bd_name: string;
    activo: boolean;
    activo_etl: boolean
}