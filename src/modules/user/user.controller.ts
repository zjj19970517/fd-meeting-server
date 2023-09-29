import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

// dto
import { UserLoginDto } from './dto/user-login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

// services
import { UserService } from './user.service';
import { JWTHelperService } from './../../shared/services/jwt-helper.service';

// decorators
import { NeedLogin } from 'src/shared/decorators/guard.decorator';
import { GetLoginUserInfo } from 'src/shared/decorators/user-info-decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger();

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

  /**
   * token 过期，刷新 Token
   * @param refreshToken
   * @returns
   */
  @Get('refresh-token')
  async refreshToken(
    @Query('refreshToken') refreshToken: string,
    @Query('isAdmin') isAdmin = false,
  ) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const userVo = await this.userService.findUserById(data.userId, isAdmin);
      // 生成鉴权 token
      const access_token = this.jwtHelperService.genAccessToken(userVo);
      // 生成刷新 token
      const refresh_token = this.jwtHelperService.genRefreshToken(userVo);
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  /**
   * POST 用户信息查询
   * @path /user/info
   */
  @Post('info')
  @NeedLogin()
  async getUserInfo(@GetLoginUserInfo('userId') userId: number) {
    if (!userId) {
      throw new UnauthorizedException('用户未登录');
    }
    return await this.userService.findUserById(userId);
  }
}
