export interface Pedido{
    codigo?:number;
    cliente?:number;
    fecha_pedido?:Date;
    fecha_entrega?:Date;
    estado?:number;
    precio_total?:string;
    forma_pago?:number;
}