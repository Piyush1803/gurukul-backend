import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email:string, password:string){
    const user = await this.userService.findByEmailOrUsername(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const {password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginDto){
    const {identifier, password } = loginDto;

    const user = await this.userService.findByEmailOrUsername(identifier);
    if(!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {sub: user.id, email:user.email};
    return{
      access_token: this.jwtService.sign(payload),
    };
  }
    logout() {
      // on frontend: just delete the token 
      // on backend, 
      return { message: 'Logout Successful'} ;
    }
  
}
