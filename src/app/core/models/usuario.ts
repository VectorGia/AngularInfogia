import {Role} from './role'

export interface Usuario{
    position: number;
    INT_IDUSUARIO_P
    STR_NOMBRE_USUARIO: string;
    STR_USERNAME_USUARIO: string
    STR_PUESTO: string;
    STR_EMAIL_USUARIO: string;
    STR_PASSWORD_USUARIO: string;
    BOOL_ESTATUS_LOGICO_USUARIO: boolean;
    role: Role;
}