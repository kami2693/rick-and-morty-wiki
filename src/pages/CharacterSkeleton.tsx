import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CharacterSkeleton = () => (
  <div style={{
    maxWidth: 500,
    margin: '3rem auto',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: '2rem',
    color: '#fff',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
  }}>
    <Skeleton width={100} height={36} style={{ marginBottom: 24 }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <Skeleton circle width={200} height={200} />
      <Skeleton width={220} height={36} />
      <Skeleton width={120} height={24} />
      <Skeleton width={120} height={24} />
      <Skeleton width={120} height={24} />
      <Skeleton width={120} height={24} />
      <Skeleton width={120} height={24} />
      <Skeleton width={120} height={24} />
    </div>
  </div>
);

export default CharacterSkeleton; 