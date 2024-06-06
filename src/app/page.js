import styles from './page.module.css';
import dynamic from 'next/dynamic';
import { InfoField } from './components/InfoField';

const Scene = dynamic(() => import('@/app/components/Scene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <InfoField styles={styles} />
      <Scene />
    </main>
  );
}
