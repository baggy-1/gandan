/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/constants';
import { serverApi } from '~/services/api';
import { requestKakaoToken } from '~/services/auth';
import { getGoogleUser, getKaKaoUser } from '~/services/user';

const tokenType = 'bearer';

const providers = {
  kakao: 'kakao',
  google: 'google',
};

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
    const { id, nickname, profile, email } = parseKakaoUser(kakaoUser);
    const user = await serverApi.get(`/users/${id}.json?print=pretty`);

    if (!user) {
      await serverApi.put(`/users/${id}.json`, {
        id,
        nickname,
        profile,
        email,
        createAt: new Date(),
        loginType: providers.kakao,
      });

      return res.status(200).json({
        token_type: tokenType,
        access_token: '존재하지 않아서 생성',
        expires_in: 21600, // 6시간
        refresh_token: 'r',
        refresh_token_expires_in: 5184000, // 60일
      });
    }

    return res.status(200).json({
      token_type: tokenType,
      access_token: 'a',
      expires_in: 21600, // 6시간
      refresh_token: 'r',
      refresh_token_expires_in: 5184000, // 60일
    });
  }

  if (provider === providers.google) {
    const { accessToken } = data;
    if (!accessToken) {
      return res
        .status(400)
        .json({ message: 'Bad request', error: 'Invalid accessToken' });
    }

    const googleUser = await getGoogleUser(accessToken);
    const { id, nickname, profile, email } = parseGoogleUser(googleUser);
    const user = await serverApi.get(`/users/${id}.json?print=pretty`);
    if (!user) {
      await serverApi.put(`/users/${id}.json`, {
        id,
        nickname,
        profile,
        email,
        createAt: new Date(),
        loginType: providers.google,
      });

      return res.status(200).json({
        token_type: tokenType,
        access_token: '존재하지 않아서 생성',
        expires_in: 21600, // 6시간
        refresh_token: 'r',
        refresh_token_expires_in: 5184000, // 60일
      });
    }

    return res.status(200).json({
      token_type: tokenType,
      access_token: 'a',
      expires_in: 21600, // 6시간
      refresh_token: 'r',
      refresh_token_expires_in: 5184000, // 60일
    });
  }

  return res
    .status(400)
    .json({ message: 'Bad request', error: 'Invalid provider' });
};

export default authHandler;

const parseKakaoUser = (user: Kakao.User) => {
  const {
    id,
    kakao_account: {
      profile: { nickname, profile_image_url },
      email,
    },
  } = user;

  return {
    id: `${id}-@-${env.KAKAO_ID_FLAG}`,
    nickname,
    profile: profile_image_url,
    email,
  };
};

const parseGoogleUser = (user: Google.User) => {
  const { id, email, name, picture } = user;

  return {
    id: `${id}-@-${env.GOOGLE_ID_FLAG}`,
    nickname: name,
    profile: picture,
    email,
  };
};
