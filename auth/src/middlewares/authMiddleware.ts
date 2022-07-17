import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwkToPem from 'jwk-to-pem';
import APP_CONFIG from '../config/appConfig';

const pems: { [key: string]: any } = {};

export const setUpPem = async (req: Request, res: Response, next: NextFunction) => {
  const URL = `https://cognito-idp.${APP_CONFIG.AWS_REGION}.amazonaws.com/${APP_CONFIG.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

  try {
    const response = await axios.get(URL);
    if (response.status !== 200) {
      throw new Error('request not successful');
    }
    const data: any = await response.data;
    const { keys } = data;
    for (let i = 0; i < keys.length; i++) {
      const keyId = keys[i].kid;
      const modulus = keys[i].n;
      const exponent = keys[i].e;
      const keyType = keys[i].kty;
      const jwk = { kty: keyType, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      pems[keyId] = pem;
    }
    req.pems = pems;
    next();
  } catch (error) {
    res.status(401).send("didn't get pems");
  }
};
