import './styles.css'
import P from 'prop-types'
export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <>
      <input
        className="text-input"
        value={searchValue}
        type="search"
        onChange={handleChange}
        placeholder="Type your search"
      />
      <br />
      <br />
      <br />
    </>
  )
}

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired
}
