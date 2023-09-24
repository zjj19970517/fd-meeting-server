import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

// entity
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

// dto
import { RegisterUserDto } from './dto/register-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

// vo
import { LoginUserVo } from './vo/login-user.vo';

// utils
import { md5Encrypt } from 'src/shared/utils/md5.utils';
import { genCaptchaCode, getCaptchaCacheKey } from './user.utils';

// services
import { RedisHelperService } from 'src/shared/services/redis-helper.service';
import { EmailHelperService } from 'src/shared/services/email-helper.service';

// constants
import { RepositoryProvideNames } from 'src/constants/provider-names';

@Injectable()
export class UserService {
  private logger = new Logger();

  @Inject(RepositoryProvideNames.USER_REPOSITORY)
  private userRepository: Repository<User>;

  @Inject(RepositoryProvideNames.ROLE_REPOSITORY)
  private roleRepository: Repository<Role>;

  @Inject(RepositoryProvideNames.PERMISSION_REPOSITORY)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisHelperService)
  private redisHelperService: RedisHelperService;

  @Inject(EmailHelperService)
  private emailHelperService: EmailHelperService;

  /**
   * 普通用户注册
   * @param registerUserParams
   * @returns
   */
  async register(registerUserParams: RegisterUserDto) {
    const captcha = await this.redisHelperService.get(
      getCaptchaCacheKey(registerUserParams.email),
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (registerUserParams.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const usernameHasRegister = await this.userRepository.findOneBy({
      username: registerUserParams.username,
    });

    if (usernameHasRegister) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.username = registerUserParams.username;
    user.password = md5Encrypt(registerUserParams.password);
    user.email = registerUserParams.email;
    user.nickName = registerUserParams.nickName;

    try {
      await this.userRepository.save(user);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  /**
   * 发送用户注册所需的验证码
   * @param email
   */
  async sendRegisterCaptcha(email: string) {
    try {
      const code = genCaptchaCode();
      await this.redisHelperService.set(
        getCaptchaCacheKey(email),
        code,
        5 * 60,
      );
      await this.emailHelperService.sendMail(
        email,
        `<p>您的注册验证码为：${code}</p >`,
        '注册验证码',
      );
      return '发送成功';
    } catch (e) {
      this.logger.error(e.message, e);
      throw new HttpException('服务器异常', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 初始化测试数据
   */
  async initTestData() {
    // 管理员
    const user1 = new User();
    user1.username = 'admin';
    user1.password = md5Encrypt('admin');
    user1.email = '15235309829@163.com';
    user1.isAdmin = true;
    user1.nickName = '管理员';
    user1.phoneNumber = '17777777711';

    // 普通用户
    const user2 = new User();
    user2.username = 'userA';
    user2.password = md5Encrypt('1234567Aa');
    user2.email = '15235309829@163.com';
    user2.nickName = '用户A';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = '/page1';
    permission1.description = '访问页面 page1';

    const permission2 = new Permission();
    permission2.code = '/page2';
    permission2.description = '访问页面 page2';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
    return 'success';
  }

  /**
   * 用户登录
   * @param userLoginParams 用户登录接口参数
   * @param isAdmin 是否为管理员
   * @returns
   */
  async userLogin(userLoginParams: UserLoginDto, isAdmin = false) {
    const user = await this.userRepository.findOne({
      where: {
        username: userLoginParams.username,
        isAdmin,
      },
      // 级联查询 roles 和 roles.permissions
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5Encrypt(userLoginParams.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const userVo = new LoginUserVo();
    userVo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
    return userVo;
  }

  /**
   * 通过用户 ID 获取用户信息
   * @param userId
   * @param isAdmin
   */
  async findUserById(userId: number, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });
    const userVo = new LoginUserVo();
    userVo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
    return userVo;
  }
}
