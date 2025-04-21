import './styles.sass';

export default function Input({ setTextSearch, textSearch }) {
  return (
    <>
      <label>Buscar Pokemon:</label><br/>
      <input
        type="text"
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="nome pokemon"
        value={textSearch}
      />
    </>
  );
}
