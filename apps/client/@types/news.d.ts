interface Headline {
  id: string;
  title: string;
  link: string;
  press: string;
}

interface Thumbnail {
  sm: string;
  md: string;
  lg: string;
}

interface News {
  id: `${string}-@-news`;
  title: string;
  headlines: Headline[];
  createAt: string;
  thumbnail: Thumbnail;
}

interface ServerNewslist {
  [key: string]: News;
}

type ClientNewslist = Omit<News, 'headlines'>[];

type Topic =
  | 'daily'
  | 'politics'
  | 'economy'
  | 'society'
  | 'business'
  | 'it'
  | 'science'
  | 'culture'
  | 'world'
  | 'entertainment'
  | 'sports'
  | 'health'
  | 'stock';
