import HomeViews from '@views/Home/HomeContainer';
import { getNewsById } from '~/services/client/news';
import getKoreaDate from '~/utils/getKoreaDate';

const Home = () => {
  return <HomeViews />;
};

export default Home;

export const getStaticProps = async () => {
  const { date } = getKoreaDate(new Date());
  const id = `${date}-@-news`;

  await getNewsById(id);

  return {
    props: {},
    revalidate: 60 * 60 * 12,
  };
};
