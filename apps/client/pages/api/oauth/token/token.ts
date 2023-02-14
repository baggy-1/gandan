import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/constants';
import { createToken, TOKEN, verifyToken } from './token.utils';

const tokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.body || !req.body.refreshToken) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { refreshToken } = req.body;

  if (!env.REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const payload = await verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET);
    if (!payload.userId || typeof payload.userId !== 'string') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!env.ACCESS_TOKEN_SECRET) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = await createToken(
      { userId: payload.userId },
      env.ACCESS_TOKEN_SECRET,
      TOKEN.expriesLabel
    );

    return res.status(200).json({
      access_token: token,
      expires_in: TOKEN.expiresIn,
    });
  } catch (error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    switch (error.code) {
      case 'ERR_JWT_EXPIRED':
        return res.status(403).json({ message: 'token expired' });
      case 'ERR_JWS_INVALID':
        return res.status(403).json({ message: 'token invalid' });
      default:
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default tokenHandler;
