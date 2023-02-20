export const topic: {
  [key in Topic]: {
    name: string;
    id: Topic;
    query: string;
  };
} = {
  daily: {
    name: '일간',
    id: 'daily',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFZxYUdjU0FtdHZHZ0pMVWlnQVAB',
  },
  politics: {
    name: '정치',
    id: 'politics',
    query: 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFZ4ZERBU0FtdHZLQUFQAQ',
  },
  economy: {
    name: '경제',
    id: 'economy',
    query: 'CAAqIggKIhxDQkFTRHdvSkwyMHZNR2RtY0hNekVnSnJieWdBUAE',
  },
  society: {
    name: '사회',
    id: 'society',
    query: 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNRGs0ZDNJU0FtdHZLQUFQAQ',
  },
  business: {
    name: '사업',
    id: 'business',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtdHZHZ0pMVWlnQVAB',
  },
  it: {
    name: '정보기술',
    id: 'it',
    query: 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNRE41ZEdNU0FtdHZLQUFQAQ',
  },
  science: {
    name: '과학',
    id: 'science',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtdHZHZ0pMVWlnQVAB',
  },
  culture: {
    name: '문화',
    id: 'culture',
    query: 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNREYzY3pVU0FtdHZLQUFQAQ',
  },
  world: {
    name: '세계',
    id: 'world',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtdHZHZ0pMVWlnQVAB',
  },
  entertainment: {
    name: '연예',
    id: 'entertainment',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtdHZHZ0pMVWlnQVAB',
  },
  sports: {
    name: '스포츠',
    id: 'sports',
    query: 'CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtdHZHZ0pMVWlnQVAB',
  },
  health: {
    name: '건강',
    id: 'health',
    query: 'CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtdHZLQUFQAQ',
  },
};
