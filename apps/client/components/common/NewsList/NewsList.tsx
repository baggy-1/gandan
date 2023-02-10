import { css } from '@emotion/react';

interface Props {
  newslist: {
    id: string;
    title: string;
    image: string;
  }[];
}

const NewsList = ({ newslist }: Props) => {
  return newslist.map(news => {
    return (
      <div key={news.id}>
        <h1>{news.title}</h1>
        <div
          css={css`
            width: 20rem;
            height: 20rem;
          `}
        />
      </div>
    );
  });
};

export default NewsList;
