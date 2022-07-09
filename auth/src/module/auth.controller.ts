import { Router, Request, Response, NextFunction } from 'express';
import { userSignInSchema, userSignUpSchema } from './auth.type';
import AuthService from './auth.service';
import { SchemaValidationError } from '../errors/schemaValidationError';

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
              // await this.userService.addUser({
              //   email,
              //   type: userType,
              //   name,
              //   companyName,
              //   industryNumber,
              // })
              next();
            } catch (error: any) {
              res.status(500).json({
                error: true,
                message: error.message,
              })
            }
          }
        } else {
          res.status(403).json({
            error: true,
            ...data,
          })
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
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
          res.status(200).json({
            error: false,
            ...data,
          })
        } else {
          res.status(403).json({
            error: true,
            ...data,
          })
        }
      } catch (error: any) {
        res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    } else {
      throw new SchemaValidationError(schemaValidation.error.errors.map((error) => error.path[0]));
    }
  }

  public getUser = async (req: Request, res: Response) => {
    
  }

  public signOut = async (req: Request, res: Response) => {
    
  }

  public routes() {
    this.router.post('/signup', this.signUp, this.signIn);
    this.router.post('/signin', this.signIn);
    this.router.post('/signout', this.getUser);
    this.router.get('/currentuser', this.getUser);
    return this.router;
  }
}
