interface Headline {
  id: string;
  title: string;
  link: string;
}

interface Thumbnail {
  sm: string;
  md: string;
  lg: string;
}

interface News {
  id: string;
  title: string;
  headlines: Headline[];
  createAt: string;
  thumbnail: Thumbnail;
}

interface ServerNewslist {
  [key in string]: News;
}

type ClientNewslist = Omit<News, 'headlines'>[];
