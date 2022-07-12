import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import APP_CONFIG from '../config/appConfig';

const pems: { [key: string]: any } = {};

// eslint-disable-next-line consistent-return
export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.header('authorization')?.split(' ')[1];
  if (!token) {
    return res?.status(401).json({
      error: true,
      message: 'not receive access token',
    });
  }

  const decodedJwt: null | JwtPayload | string = jwt.decode(token, { complete: true });
  if (decodedJwt === null) {
    return res.status(401).json({
      error: true,
      message: 'not able to decode access token',
    });
  }
  const { kid } = decodedJwt.header;
  const pem = pems[kid];
  if (!pem) {
    return res.status(401).json({
      error: true,
      message: 'pem kid not match with decoded token',
    });
  }
  jwt.verify(token, pem, (err: any) => {
    if (err) {
      res.status(401).json({
        error: true,
        tokenExpired: true,
        message: 'verification of token error',
      });
    } else {
      next();
    }
  });
};

// eslint-disable-next-line consistent-return
export const verifyIdToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.header('idToken');
  if (!token) {
    return res?.status(401).json({
      error: true,
      message: 'not receive id token',
    });
  }

  const decodedJwt: null | JwtPayload | string = jwt.decode(token, { complete: true });
  if (decodedJwt === null) {
    return res.status(401).json({
      error: true,
      message: 'not able to decode id token',
    });
  }
  req.user = decodedJwt.payload;
  next();
};

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
    next();
  } catch (error) {
    res.status(401).send("didn't get pems");
  }
};
