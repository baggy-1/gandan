import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '~/pages/api/oauth/token/token.utils';
import { env } from './constants';

export const config = {
  matcher: ['/api/:path*'],
};

const excludePaths = [
  '/api/oauth/auth',
  '/api/oauth/token',
  '/api/news',
  '/api/cron',
];

const middleware = async (req: NextRequest) => {
  const {
    nextUrl: { pathname: nextPath },
    headers,
  } = req;
  const { rewrite } = NextResponse;

  if (excludePaths.find(path => nextPath.startsWith(path))) {
    return rewrite(new URL(nextPath, req.url));
  }

  const token = headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        message: 'Unauthorized',
      }),
      { status: 401 }
    );
  }

  if (!env.ACCESS_TOKEN_SECRET) {
    return new NextResponse(
      JSON.stringify({
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }

  try {
    const payload = await verifyToken(token, env.ACCESS_TOKEN_SECRET);
    const urlWithPayload = `${nextPath}?payload=${JSON.stringify(payload)}`;

    return rewrite(new URL(urlWithPayload, req.url));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (!error.code) {
      return new NextResponse(
        JSON.stringify({
          message: 'Internal server error',
        }),
        { status: 500 }
      );
    }

    switch (error.code) {
      case 'ERR_JWT_EXPIRED':
        return new NextResponse(
          JSON.stringify({
            message: 'Unauthorized',
          }),
          { status: 401 }
        );
      case 'ERR_JWS_INVALID':
        return new NextResponse(
          JSON.stringify({
            message: 'Unauthorized',
          }),
          { status: 401 }
        );
      default:
        return new NextResponse(
          JSON.stringify({
            message: 'Internal server error',
          }),
          { status: 500 }
        );
    }
  }
};

export default middleware;
