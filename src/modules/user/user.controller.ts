import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Controller, Get, Post, Body, Query, Inject } from '@nestjs/common';

// dto
import { UserLoginDto } from './dto/user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

// services
import { UserService } from './user.service';
import { JWTHelperService } from './../../shared/services/jwt-helper.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(JWTHelperService)
  private jwtHelperService: JWTHelperService;

  /**
   * POST 普通用户注册
   * @path /user/register
   */
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  /**
   * GET 发送用户注册所需的验证码
   * @path /user/register-captcha/send
   */
  @Get('register-captcha/send')
  async sendRegisterCaptcha(@Query('email') email: string) {
    return this.userService.sendRegisterCaptcha(email);
  }

  /**
   * GET 初始化测试数据
   * @path /user/test-data/init
   */
  @Get('test-data/init')
  async initTestData() {
    return this.userService.initTestData();
  }

  /**
   * POET 用户登录
   * @path /user/login
   */
  @Post('login')
  async userLogin(@Body() userLoginParams: UserLoginDto) {
    const userVo = await this.userService.userLogin(userLoginParams);
    // 生成鉴权 token
    userVo.accessToken = this.jwtHelperService.genAccessToken(userVo);
    // 生成刷新 token
    userVo.refreshToken = this.jwtHelperService.genRefreshToken(userVo);
    return userVo;
  }

  /**
   * POST 管理员登录
   * @path /user/admin/login
   */
  @Post('admin/login')
  async adminLogin(@Body() userLoginParams: UserLoginDto) {
    const userVo = await this.userService.userLogin(
      userLoginParams,
      true /* isAdmin */,
    );
    // 生成鉴权 token
    userVo.accessToken = this.jwtHelperService.genAccessToken(userVo);
    // 生成刷新 token
    userVo.refreshToken = this.jwtHelperService.genRefreshToken(userVo);
    return userVo;
  }
}
