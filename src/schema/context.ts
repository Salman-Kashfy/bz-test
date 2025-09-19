import UserModel from './user/model';
import OtpModel from './otp/model';
import { Transporter } from 'nodemailer';
import CountryModel from './country/model';
import CityModel from './city/model';
import RoleModel from './role/model';
import PermissionModel from './permission/model';
import RolePermissionModel from './role-permission/model';

export default class Context {
    static instance:Context;
    otp: OtpModel;
    user: UserModel;
    city: CityModel;
    role: RoleModel;
    userId: string;
    schema: any;
    country: CountryModel;
    permission: PermissionModel;
    rolePermission: RolePermissionModel;
    req: object;
    transporter:Transporter;

    constructor(connection: any, schema: any, req?: any, user?: any) {
        this.otp = new OtpModel(connection, this);
        this.user = new UserModel(connection, this);
        this.city = new CityModel(connection, this);
        this.role = new RoleModel(connection, this);
        this.userId = user ? user.id : null;
        this.schema = schema;
        this.country = new CountryModel(connection, this);
        this.permission = new PermissionModel(connection, this);
        this.rolePermission = new RolePermissionModel(connection, this);
    }

    static getInstance(connection: any, schema: any, req?: any, auth?: any) {
        if (!this.instance) {
            this.instance = new Context(connection, schema, req, auth);
        }
        return this.instance;
    }

    setReq(req:any){
        this.req = req
    }

    setAuth(user:any){
        this.user = user
        this.userId = user.id
    }
}