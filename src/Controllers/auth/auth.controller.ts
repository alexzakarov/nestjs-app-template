import {
    Controller,
    Request,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Delete,
    BadRequestException,
    Res,
    UseGuards,
    Ip,
    Session,
    Response
} from '@nestjs/common';


import { JwtAuthGuard } from '../../modules/auth/jwt/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/modules/auth/local/local-auth.guard';
import { SessionGuard } from 'src/modules/auth/session/session.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('Auth')
export class JwtAuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) { }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
    /*@UseGuards(JwtAuthGuard)
    @Get("/logout")
    async logout(@Res() res, @Session() session: Record<string,any>) {
        await session.destroy(()=>{
            res.clearCookie('NESTJS_SESSION_ID', {path:"/"});
            var successException = new SuccessException()
            return res.json(successException.success("Logout Successful"));
        }); 
    }
    */
}