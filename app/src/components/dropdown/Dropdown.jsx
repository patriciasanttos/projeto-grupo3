import './Dropdown.scss'

const Dropdown = ({ onChange, children, defaultValue, placeholder, error }) => {
  const getClass = () => {
    if (error) return "dropdown dropdown-error";

    return "dropdown";
  };

  const message = error ? `${placeholder} (${error})` : placeholder;

  return (
    <select defaultValue={defaultValue} onChange={onChange} className={getClass()}>
      <option value="" disabled>
        {message}
      </option>
      {children}
    </select>
  );
};

export default Dropdown;