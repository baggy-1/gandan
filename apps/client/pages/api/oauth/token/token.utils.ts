import { jwtVerify, SignJWT } from 'jose';
import { env } from '~/constants';

interface Payload {
  userId: string;
}

export const TOKEN = {
  type: 'bearer',
  expiresIn: 6 * 60 * 60 * 1000, // 6시간
  expriesLabel: '6h',
  refreshTokenExpiresIn: 14 * 24 * 60 * 60 * 1000, // 14일
  refreshTokenExpiresLabel: '14d',
};

export const getTokenResponse = async (payload: Payload) => {
  if (!env.ACCESS_TOKEN_SECRET || !env.REFRESH_TOKEN_SECRET) {
    throw new Error('Invalid token secret');
  }

  const accessToken = await createToken(
    payload,
    env.ACCESS_TOKEN_SECRET,
    TOKEN.expriesLabel
  );

  const refreshToken = await createToken(
    payload,
    env.REFRESH_TOKEN_SECRET,
    TOKEN.refreshTokenExpiresLabel
  );

  return {
    token_type: TOKEN.type,
    access_token: accessToken,
    expires_in: TOKEN.expiresIn,
    refresh_token: refreshToken,
    refresh_token_expires_in: TOKEN.refreshTokenExpiresIn,
  };
};

export const createToken = (
  payload: Payload,
  secret: string,
  expiredIn: string
) => {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setIssuer('urn:auth:issuer')
    .setAudience('urn:auth:audience')
    .setExpirationTime(expiredIn)
    .sign(new TextEncoder().encode(secret));
};

export const verifyToken = async (token: string, secret: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
};
