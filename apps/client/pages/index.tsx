import Head from 'next/head';
import styles from '~/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Gandan News</title>
        <meta
          name="description"
          content="하루 한 번, 간단한 뉴스를 제공해드립니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>홈</div>
      </main>
    </>
  );
}
