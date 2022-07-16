import { Router, Request, Response, NextFunction } from 'express';
import { userSignInSchema, userSignUpSchema } from './auth.type';
import AuthService from './auth.service';
import { SchemaValidationError } from '../errors/schemaValidationError';
import { User } from '../model/user';
import { DatabaseError } from '../errors/databaseError';
import { EmailExistError } from '../errors/emailAlreadyExist';

export class AuthController {
  public router: Router;
  public authService = AuthService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const schemaValidation = userSignUpSchema.safeParse(req.body);
    if (schemaValidation.success) {
      const { name, password, email, userType } = req.body;
      const userAttr = [];
      userAttr.push({ Name: 'email', Value: email });
      userAttr.push({ Name: 'custom:userType', Value: userType });
      try {
        const data: any = await this.authService.signUpUser(email, password, userAttr)
        if (!data.error) {
          if (!!data?.UserConfirmed && !!data?.UserSub) {
            try {
              const user = User.build({
                email: email,
                userType: userType
              })
              await user.save();
              next();
            } catch (error: any) {
              throw new DatabaseError();
            }
          }
        } else {
          throw new EmailExistError();
        }
      } catch (error: any) {
        throw new EmailExistError();
      }
    } else {
     throw new SchemaValidationError(schemaValidation.error.errors.map((error) => error.path[0]));
    }
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const body = {
      email: req.body.email,
      password: req.body.password,
    }
    const schemaValidation = userSignInSchema.safeParse(body)
    if (schemaValidation.success) {
      const { email, password } = body;
      try {
        const data: any = await this.authService.signInUser(email, password)
        if (!data.error) {
          req.session = {
            accessToken: data.AuthenticationResult.AccessToken,
            idToken: data.AuthenticationResult.IdToken
          }
          res.status(200).json({
            error: false,
            ...data,
          })
        } else {
          throw new DatabaseError();
        }
      } catch (error: any) {
        throw new DatabaseError();
      }
    } else {
      throw new SchemaValidationError(schemaValidation.error.errors.map((error) => error.path[0]));
    }
  }

  public getUser = async (req: Request, res: Response) => {
    if (req.user.email) {
      const user = await User.findOne({
        email: req.user.email
      }).lean()
      res.status(200).send({
        error: false,
        ...user,
      });
    } else {
      res.status(402).send({
        error: false,
        message: 'user did not find from DB',
      });
    }
  }

  public routes() {
    this.router.post('/signup', this.signUp, this.signIn);
    this.router.post('/signin', this.signIn);
    this.router.get('/', this.getUser);
    return this.router;
  }
}
