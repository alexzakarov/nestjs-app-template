import { CanActivate, ConsoleLogger, ExecutionContext, Injectable, Session } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(private reflector:Reflector){}
    
 

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRoles){
            return true;
        }
        const req = context.switchToHttp().getRequest();
        /*if(req.url.includes("/api")){
            const user = req.user;
            return requiredRoles.some( (role) => user.role.includes(role));
        }*/
        //return requiredRoles.some( (role) => req.session.passport.user.role.includes(role));
        //user.session.passport.user
        const user = req.user;
        return requiredRoles.some( (role) => user.role.includes(role));  
    }
}