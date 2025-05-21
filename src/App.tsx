import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Card from './components/Card/Card';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import Filter from './components/Filter/Filter';
import CharacterPage from './pages/CharacterPage';
import './App.css';

interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<{
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    location: {
      name: string;
      url: string;
    };
  }>;
}

declare global {
  interface Window {
    adsbygoogle: { push: (config: unknown) => void }[];
  }
}

function AdBlock() {
  const adRef = useRef(null);
  useEffect(() => {
    if (window.adsbygoogle && adRef.current) {
      // @ts-expect-error - Google AdSense types are not available
      window.adsbygoogle.push({});
    }
  }, []);
  return (
    <ins className="adsbygoogle"
      style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
      data-ad-client="ca-pub-2391579795465441"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
}

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Локальний стан для фільтрів і пошуку
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || 1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [species, setSpecies] = useState(searchParams.get('species') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');

  // Синхронізуємо локальний стан з query-параметрами
  useEffect(() => {
    setPageNumber(Number(searchParams.get('page')) || 1);
    setSearch(searchParams.get('search') || '');
    setStatus(searchParams.get('status') || '');
    setSpecies(searchParams.get('species') || '');
    setGender(searchParams.get('gender') || '');
  }, [searchParams]);

  // Оновлення query params
  const updateParam = (key: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === '' || value === 1) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    setSearchParams(newParams, { replace: true });
  };

  // Оновлення сторінки при зміні фільтрів/пошуку
  const handleSearch = (val: string) => {
    setSearch(val);
    updateParam('search', val);
    updateParam('page', 1);
  };
  const handleStatus = (val: string) => {
    setStatus(val);
    updateParam('status', val);
    updateParam('page', 1);
  };
  const handleSpecies = (val: string) => {
    setSpecies(val);
    updateParam('species', val);
    updateParam('page', 1);
  };
  const handleGender = (val: string) => {
    setGender(val);
    updateParam('gender', val);
    updateParam('page', 1);
  };
  const handlePage = (val: number) => {
    setPageNumber(val);
    updateParam('page', val);
  };
  const handleClearFilters = () => {
    setStatus('');
    setSpecies('');
    setGender('');
    updateParam('status', '');
    updateParam('species', '');
    updateParam('gender', '');
    updateParam('page', 1);
  };

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&species=${species}&gender=${gender}`;
  const [fetchedData, setFetchedData] = useState<RickAndMortyResponse>({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { info, results } = fetchedData;

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      setFetchedData(data);
      setIsLoading(false);
    })();
  }, [api]);

  return (
    <>
      <div className="search-filters-container">
        <Search
          value={search}
          onChange={handleSearch}
        />
        <Filter
          status={status}
          gender={gender}
          species={species}
          onStatusChange={handleStatus}
          onGenderChange={handleGender}
          onSpeciesChange={handleSpecies}
          onClear={handleClearFilters}
        />
      </div>
      <div className="container">
        <div className="row">
          <Card page={import.meta.env.BASE_URL} results={isLoading ? undefined : results} />
        </div>
      </div>
      <Pagination
        info={info}
        pageNumber={pageNumber}
        setPageNumber={handlePage}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-center mb-4">Rick & Morty <span className="text-primary">Wiki</span></h1>
        <AdBlock />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:id" element={<CharacterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
