import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ABILITY_KEY } from "./ability.decorator";
import { AbilityFactory } from "./ability.factory";


@Injectable()
export class AbilityGuard implements CanActivate
{
    constructor(private reflector:Reflector){}
    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const abilities = this.reflector.getAllAndOverride<any>(ABILITY_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const requiredPermissions = abilities[0];
        const entity = abilities[1];
        if(!requiredPermissions){
            return true;
        }
        const req = context.switchToHttp().getRequest();
        
        const user = req.user;
        const params = req.params;
        const foundRole = requiredPermissions.find( (role) => user.role.includes(role.name));
        if(!foundRole){
            return false;
        }
        const abilityFactory = new AbilityFactory();
        if(await abilityFactory.isAble(foundRole, user, params, entity))
        {
            return true;
        }
        
        return false;
    }
}