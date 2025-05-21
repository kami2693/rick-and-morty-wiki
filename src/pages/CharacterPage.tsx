import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CharacterSkeleton from './CharacterSkeleton';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: { name: string };
  origin: { name: string };
  type: string;
  episode: string[];
}

const CharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Персонажа не знайдено');
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CharacterSkeleton />;
  }

  if (error || !character) {
    return <div style={{ color: 'red', fontSize: '1.5rem', textAlign: 'center', marginTop: '3rem' }}>{error || 'Персонажа не знайдено'}</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: '3rem auto', background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '2rem', color: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: '2px solid #97ce4c',
          color: '#97ce4c',
          borderRadius: 30,
          padding: '0.5rem 1.5rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          transition: 'all 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = '#97ce4c', e.currentTarget.style.color = '#222')}
        onMouseOut={e => (e.currentTarget.style.background = 'none', e.currentTarget.style.color = '#97ce4c')}
      >
        ← Назад
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <img src={character.image} alt={character.name} style={{ width: 200, height: 200, borderRadius: '50%', border: '4px solid #97ce4c', objectFit: 'cover', background: '#222' }} />
        <h2 style={{ color: '#97ce4c', fontSize: '2.2rem', margin: 0 }}>{character.name}</h2>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Статус:</b> {character.status}
        </div>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Вид:</b> {character.species}
        </div>
        {character.type && (
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            <b>Тип:</b> {character.type}
          </div>
        )}
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Стать:</b> {character.gender}
        </div>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Походження:</b> {character.origin?.name}
        </div>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Локація:</b> {character.location?.name}
        </div>
        <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <b>Кількість епізодів:</b> {character.episode.length}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage; 