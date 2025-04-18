import './styles.sass';

function Input({ setSearchInput }) {
  return (
    <>
      <label>Buscar Pokemon:</label><br/>
      <input
        type="text"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="nome pokemon"
      />
    </>
  );
}

export default Input;
