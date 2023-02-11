export const getParseHeadlines = (news: GoogleNews): Headline[] => {
  const { items } = news;

  return items.map(({ id, title: originTitle, link }) => {
    const [title, press] = originTitle.split(' - ');

    return {
      id,
      title,
      link,
      press,
    };
  });
};

const sizes = {
  sm: '240/320',
  md: '480/640',
  lg: '720/960',
} as const;

export const getRandomThumbnail = (seed: string) => {
  const sm = `https://picsum.photos/seed/${seed}/${sizes.sm}.webp`;
  const md = `https://picsum.photos/seed/${seed}/${sizes.md}.webp`;
  const lg = `https://picsum.photos/seed/${seed}/${sizes.lg}.webp`;

  return {
    sm,
    md,
    lg,
  };
};
