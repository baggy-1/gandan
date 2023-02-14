/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { requestKakaoToken } from '~/services/server/auth';
import {
  createUser,
  getGoogleUser,
  getKaKaoUser,
  getUser,
} from '~/services/server/user';
import { getKoreaDate } from '~/utils';
import { getTokenResponse } from '../token/token.utils';
import { getParseGoogleUser, getParseKakaoUser } from './auth.utils';

const providers = {
  kakao: 'kakao',
  google: 'google',
} as const;

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!req.body || !req.body.provider || !req.body.data) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { provider, data } = req.body;

  if (provider === providers.kakao) {
    const { code } = data;
    if (!code) {
      return res
        .status(400)
        .json({ message: 'Bad request', error: 'Invalid code' });
    }

    const { access_token } = await requestKakaoToken(code);
    const kakaoUser = await getKaKaoUser(access_token);
    const { id, ...others } = getParseKakaoUser(kakaoUser);
    const user = await getUser(id);
    const token = await getTokenResponse({ userId: id });

    if (!user) {
      try {
        await createUser(id, {
          id,
          createAt: new Date(),
          loginType: providers.kakao,
          ...others,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Internal server error', error });
      }

      return res.status(200).json(token);
    }

    return res.status(200).json(token);
  }

  if (provider === providers.google) {
    const { accessToken } = data;
    if (!accessToken) {
      return res
        .status(400)
        .json({ message: 'Bad request', error: 'Invalid accessToken' });
    }

    const googleUser = await getGoogleUser(accessToken);
    const { id, ...others } = getParseGoogleUser(googleUser);
    const user = await getUser(id);
    const token = await getTokenResponse({ userId: id });
    const { datetime } = getKoreaDate(new Date());

    if (!user) {
      try {
        await createUser(id, {
          id,
          createAt: datetime,
          loginType: providers.google,
          ...others,
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Internal server error', error });
      }

      return res.status(200).json(token);
    }

    return res.status(200).json(token);
  }

  return res
    .status(400)
    .json({ message: 'Bad request', error: 'Invalid provider' });
};

export default authHandler;
