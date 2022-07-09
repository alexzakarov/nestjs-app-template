import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Users } from "../../users/users.entity";
import { Admins } from "../../admins/admins.entity";
import { UserService } from "../../users/users.service";
import { AdminsService } from "../../admins/admins.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(private userService: UserService, private adminsService: AdminsService) { 
        super();
    }    

    async serializeUser(user: Users | Admins, done: (err: any, user: Users | Admins) => void) {
        console.log("serializeUser");
        done(null, user);
    }

    async deserializeUser(user: Users | Admins, done: (err: any, user: Users | Admins) => void) {
        console.log("deserializeUser");
        const userDB = await this.userService.getOneService(user.id);
        const adminDB = await this.adminsService.getAdminService(user.id);
        if(adminDB)
        {
            return done(null,adminDB);
        }
        else if(userDB)
        {
            return done(null,userDB)
        }
        return done(null,null);
    }
}