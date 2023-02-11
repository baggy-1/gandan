import Grid from '~/components/common/Grid';
import NewsCardSkeleton from '../NewsCard';

const NewsList = () => {
  return (
    <Grid>
      {Array(6)
        .fill(0)
        .map((_, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <NewsCardSkeleton key={index} />;
        })}
    </Grid>
  );
};

export default NewsList;
