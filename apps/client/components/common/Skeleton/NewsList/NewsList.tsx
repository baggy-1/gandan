import Grid from '~/components/common/Grid';
import NewsCardSkeleton from '../NewsCard';

interface Props {
  count?: number;
}

const NewsList = ({ count = 6 }: Props) => {
  return (
    <Grid>
      {Array(count)
        .fill(0)
        .map((_, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <NewsCardSkeleton key={index} />;
        })}
    </Grid>
  );
};

export default NewsList;
