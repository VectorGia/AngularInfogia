export interface Rubros{
    id
    activo: boolean;
    nombre: string;
    aritmetica?: string;
    clave: string;
    tipo_agrupador?: string;
    rango_cuentas_excludias?: string;
    rangos_cuentas_incluidas: string;
    tipo_id?: string;
    hijos?: any;
    tipo_cuenta?: any;
    id_modelo_neg
}
