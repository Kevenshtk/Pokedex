import './styles.sass';

export default function Button({ text, className, onClick }) {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {text.length > 20 ? <img src={text} /> : text}
    </button>
  );
}
