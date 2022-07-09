import { Inject, Module } from "@nestjs/common";
import { AbilityFactory } from "./ability.factory";
import { AbilityGuard } from "./ability.guard";

@Module({
    imports: [],
    providers:[
        AbilityFactory,
        AbilityGuard,
    ],
})
export class AbilityModule{}