interface Headline {
  id: string;
  title: string;
  link: string;
}

interface News {
  id: string;
  headlines: Headline[];
  createAt: string;
}
