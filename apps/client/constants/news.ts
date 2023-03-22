import { getGoogleNewsUrl } from '~/utils';

export const topic: {
  [key in Topic]: {
    name: string;
    id: Topic;
    url: string;
  };
} = {
  daily: {
    name: '일간',
    id: 'daily',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  politics: {
    name: '정치',
    id: 'politics',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFZ4ZERBU0FtdHZLQUFQAQ'),
  },
  economy: {
    name: '경제',
    id: 'economy',
    url: getGoogleNewsUrl(
      'CAAqIggKIhxDQkFTRHdvSkwyMHZNR2RtY0hNekVnSnJieWdBUAE'
    ),
  },
  stock: {
    name: '증권',
    id: 'stock',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNR0pzTmpjU0FtdHZLQUFQAQ'),
  },
  society: {
    name: '사회',
    id: 'society',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNRGs0ZDNJU0FtdHZLQUFQAQ'),
  },
  business: {
    name: '사업',
    id: 'business',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  it: {
    name: '정보기술',
    id: 'it',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNRE41ZEdNU0FtdHZLQUFQAQ'),
  },
  science: {
    name: '과학',
    id: 'science',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  culture: {
    name: '문화',
    id: 'culture',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNREYzY3pVU0FtdHZLQUFQAQ'),
  },
  world: {
    name: '세계',
    id: 'world',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  entertainment: {
    name: '연예',
    id: 'entertainment',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  sports: {
    name: '스포츠',
    id: 'sports',
    url: getGoogleNewsUrl(
      'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtdHZHZ0pMVWlnQVAB'
    ),
  },
  health: {
    name: '건강',
    id: 'health',
    url: getGoogleNewsUrl('CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtdHZLQUFQAQ'),
  },
};
