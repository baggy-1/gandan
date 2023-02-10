interface Item {
  id: string;
  title: string;
  description: string;
  link: string;
  published: number;
  created: number;
  category: string[];
  enclosures: string[];
  media: object;
}

interface GoogleNews {
  title: string;
  description: string;
  link: string;
  image: string;
  category: string[];
  items: Item[];
}

type Parse = (url: string, config?: AxiosRequestConfig) => Promise<GoogleNews>;
