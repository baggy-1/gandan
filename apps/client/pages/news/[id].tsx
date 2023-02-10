import { useRouter } from 'next/router';

const NewsDetail = () => {
  const { query } = useRouter();
  const { id: queryId } = query;
  const id = `${queryId}`;

  return <div>뉴스 디테일</div>;
};

export default NewsDetail;
