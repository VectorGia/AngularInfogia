export interface Rubros{
    id
    activo: boolean;
    nombre: string;
    aritmetica?: string;
    clave: string;
    naturaleza: string;
    rango_cuentas_excludias?: string;
    rangos_cuentas_incluidas: string;
    tipo_id: string;
    hijos: any;
    id_modelo_neg
}