import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


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
  const pem = req.pems[kid];
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