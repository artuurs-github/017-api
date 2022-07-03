import './SearchInput.scss';

type SearchInputProps = {
  placeholder: string,
  handleChange: (event: any) => void
}

const SearchInput = ({ placeholder, handleChange }: SearchInputProps) => (
  <div className="search-input-container">
    <input
      className="search-input"
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

export default SearchInput;
