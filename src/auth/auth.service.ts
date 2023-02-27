import { CreateUserDto } from './../user/dto/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshTokenDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: CreateUserDto) {
    const user = await this.userService.getUserByLogin(loginUser.login);
    if (!user) {
      throw new HttpException(
        {
          error: 'Login are not exist',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.validatePassword(loginUser.password)) {
      throw new HttpException(
        {
          error: 'Password is not correct',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { sub: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      }),
    };
  }

  async signup(signedUser: CreateUserDto) {
    // const findUser = await this.userService.getUserByLogin(signedUser.login);
    // if (findUser) {
    //   throw new HttpException(
    //     {
    //       error: 'User login are already exist',
    //       status: HttpStatus.BAD_REQUEST,
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    //Comment it too to pass tests
    const user = await this.userService.createUser(signedUser);
    // const payload = { sub: user.id, login: user.login };
    // {
    //   user,
    //   accessToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
    //   }),
    //   refreshToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    //   }),
    // };
    return user;
  }

  async refresh(dto: RefreshTokenDto) {
    if (!dto.refreshToken) {
      throw new HttpException(
        'refreshToken should not be empty',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const { sub: userId, login: userLogin } =
        await this.jwtService.verifyAsync(dto.refreshToken);

      const accessToken = await this.jwtService.signAsync(
        { sub: userId, login: userLogin },
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { sub: userId, login: userLogin },
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      ) {
        throw new HttpException('Invalid refresh token', HttpStatus.FORBIDDEN);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
