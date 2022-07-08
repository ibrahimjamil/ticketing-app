import AWS from 'aws-sdk';
import crypto from 'crypto'
import APP_CONFIG from '../config/appConfig';

class AuthService {
  private config = {
    region: APP_CONFIG.AWS_REGION,
  }

  private secretHash = APP_CONFIG.AWS_COGNITO_SECRET_HASH;
  private clientId = APP_CONFIG.AWS_COGNITO_CLIENT_ID;

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config)
  }

  public async signUpUser(email: string, password: string, userAttr: Array<any>) {
    // using Username parameters to take email in here as intentional as required in function
    const params = {
      ClientId: this.clientId || '',
      Password: password,
      Username: email,
      SecretHash: this.hashSecret(email),
      UserAttributes: userAttr,
    }

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      }
    }
  }

  public async signInUser(email: string, password: string) {
    // using Username parameters to take email in here as intentional as required in function
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId || '',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(email),
      },
    }

    try {
      const data = await this.cognitoIdentity.initiateAuth(params).promise();
      return data;
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  private hashSecret(email: string): string {
    return crypto.createHmac('SHA256', this.secretHash || '')
      .update(email + this.clientId)
      .digest('base64')
  }
}

export default new AuthService();
