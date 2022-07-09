import {
  Inject, Provider, Param, Injectable 
  } from '@nestjs/common';
import { getRepository } from 'typeorm';

export enum PermissionLevel
{
    ALL = "all",
    OWN = "own",
    PERMITTED = "permitted",
    NONE = "none"
}

export class AbilityFactory {
    filter(args):any
    {
        var firstArg; 
        Object.keys(args).forEach(key => {
            firstArg = args[key];
            return;
        })
        return firstArg;
    }
    async isAble(permissionLevel, user, params, entity)
    {
        switch(permissionLevel.level)
        {
            case PermissionLevel.ALL:
                return true;
            case PermissionLevel.OWN:
                var connection:any = getRepository(entity); 
                var foundEntity = await connection.findOne(this.filter(params));
                if(!foundEntity) 
                {
                    return true;
                }
                else if(foundEntity && foundEntity.partnerId == user.partnerId)
                {
                    return true;
                }
                return false;
            case PermissionLevel.PERMITTED:
                var connection:any = getRepository(entity); 
                var foundEntity =  await connection.findOne(this.filter(params));
                return (foundEntity && user.partnerId == foundEntity.partnerId && user.id == foundEntity.permittedUserId)? true: false; 
            case PermissionLevel.NONE:
                return false;
            default:
                return false;
        }
    }
}