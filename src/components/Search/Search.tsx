interface SearchProps {
  value: string;
  onChange: (val: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Пошук персонажів..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <i className="fas fa-search search-icon"></i>
      </div>
    </div>
  );
};

export default Search; 