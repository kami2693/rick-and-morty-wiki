interface FilterProps {
  status: string;
  gender: string;
  species: string;
  onStatusChange: (val: string) => void;
  onGenderChange: (val: string) => void;
  onSpeciesChange: (val: string) => void;
  onClear: () => void;
}

const Filter = ({ status, gender, species, onStatusChange, onGenderChange, onSpeciesChange, onClear }: FilterProps) => {
  const hasActiveFilters = status || gender || species;

  return (
    <div className="filters-container">
      <div className="filter-group">
        <select
          className="filter-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Статус</option>
          <option value="alive">Живий</option>
          <option value="dead">Мертвий</option>
          <option value="unknown">Невідомо</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          className="filter-select"
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
        >
          <option value="">Стать</option>
          <option value="female">Жіноча</option>
          <option value="male">Чоловіча</option>
          <option value="genderless">Без статі</option>
          <option value="unknown">Невідомо</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          className="filter-select"
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
        >
          <option value="">Вид</option>
          <option value="human">Людина</option>
          <option value="alien">Інопланетянин</option>
          <option value="humanoid">Гуманоїд</option>
          <option value="poopybutthole">Poopybutthole</option>
          <option value="mythological">Міфічна істота</option>
          <option value="unknown">Невідомо</option>
          <option value="animal">Тварина</option>
          <option value="disease">Хвороба</option>
          <option value="robot">Робот</option>
          <option value="cronenberg">Кроненберг</option>
        </select>
      </div>

      <button
        className={`filter-button ${hasActiveFilters ? 'active' : ''}`}
        onClick={onClear}
      >
        <i className="fas fa-times me-2"></i>
        Скинути
      </button>
    </div>
  );
};

export default Filter; 