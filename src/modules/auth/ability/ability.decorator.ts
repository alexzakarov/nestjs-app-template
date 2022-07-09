import { SetMetadata } from "@nestjs/common";
import { Role } from "../roles/roles.enum";
export const ABILITY_KEY = 'abilities';
export const Ability = (...abilities:any) => SetMetadata(ABILITY_KEY, abilities);