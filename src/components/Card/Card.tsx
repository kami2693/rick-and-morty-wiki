import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

interface CardProps {
  results: Character[] | undefined | null;
  page: string;
}

const CARD_WIDTH = 320; // ширина однієї картки + gap (має відповідати стилям)

const Card = ({ results, page }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Показати скелетони тільки якщо results === undefined або null (тобто йде завантаження)
  if (results === undefined || results === null) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <div className="cards-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="card" key={i}>
              <Skeleton height={170} width={300} style={{ borderRadius: 15 }} />
              <div style={{ margin: '1rem 0 0.5rem 0' }}>
                <Skeleton height={32} width={200} />
              </div>
              <div style={{ padding: '1rem 1.2rem 1.2rem 1.2rem' }}>
                <Skeleton height={18} width={180} style={{ marginBottom: 8 }} />
                <Skeleton height={18} width={140} style={{ marginBottom: 8 }} />
                <Skeleton height={18} width={160} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Якщо results — порожній масив, показати повідомлення
  if (Array.isArray(results) && results.length === 0) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <div className="cards-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#97ce4c', fontSize: '1.5rem', margin: '2rem auto' }}>No Characters Found :/</div>
        </div>
      </div>
    );
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current || !results?.length) return;
    const container = containerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    if (direction === 'right') {
      if (currentScroll + CARD_WIDTH >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
      }
    } else {
      if (currentScroll <= 0) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
      }
    }
  };

  let display;
  if (results) {
    display = results.map((x) => {
      const { id, name, status, species, image, location } = x;
      return (
        <Link
          style={{ textDecoration: "none" }}
          to={`${page}${id}`}
          key={id}
          className="card-link"
        >
          <div className="card">
            <img src={image} alt={name} className="card-img-top" />
            <h5 className="card-title" style={{ margin: '1rem 0 0.5rem 0' }}>{name}</h5>
            <div className="card-body" style={{ padding: '1rem 1.2rem 1.2rem 1.2rem' }}>
              <div className="card-text">
                <div>
                  <span className="fw-bold">Status: </span>
                  {(() => {
                    if (status === "Dead") {
                      return <span className="badge bg-danger">{status}</span>;
                    } else if (status === "Alive") {
                      return <span className="badge bg-success">{status}</span>;
                    } else {
                      return <span className="badge bg-secondary">{status}</span>;
                    }
                  })()}
                </div>
                <div>
                  <span className="fw-bold">Species: </span>
                  {species}
                </div>
                <div>
                  <span className="fw-bold">Location: </span>
                  {location?.name}
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        className="slider-btn slider-btn-left"
        onClick={() => scroll('left')}
        aria-label="Прокрутити вліво"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="cards-container" ref={containerRef}>
        {display}
      </div>
      <button
        className="slider-btn slider-btn-right"
        onClick={() => scroll('right')}
        aria-label="Прокрутити вправо"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Card; 