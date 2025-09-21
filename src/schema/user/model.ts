import BaseModel from '../baseModel';
import {User as UserEntity} from '../../database/entity/User';
import {OtpError} from "../otp/enum";
import {hash} from "bcrypt";
import {InviteParams} from "./interfaces";
import {MoreThanOrEqual} from "typeorm";
import {isValidPassword} from "../../shared/lib/util";

export default class User extends BaseModel {
    repository: any;
    connection: any;

    constructor(connection: any, context: any) {
        super(connection, connection.getRepository(UserEntity), context);
    }

    /**
     * Admin's invite to reset password
     * */
    async invite(input:InviteParams){
        const { inviteLink, password } = input
        const user = await this.validateInvite(inviteLink)
        if(!user){
            return this.formatErrors([OtpError.NOT_FOUND],'Invitation not found or expired. Please consider to reset your password.')
        }
        if(!isValidPassword(password)){
            return this.formatErrors([OtpError.WEAK_PASSWORD],'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character')
        }
        user.password = await hash(password, 10)
        user.inviteLink = null
        user.inviteExpiry = null
        await user.save()
        return this.successResponse({})
    }

    async validateInvite(inviteLink:string){
        return this.repository.findOneBy({ inviteLink, inviteExpiry: MoreThanOrEqual(new Date())})
    }
}
