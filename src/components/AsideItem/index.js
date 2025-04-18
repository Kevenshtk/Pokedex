import './styles.sass';

export default function AsideItem({
  image,
  nome,
  tipo,
  onClick
}) {

  return (
    <li
      className={`pokemon ${tipo}`}
      onClick={onClick}
    >
      <img src={image} alt={`imagem pokemon ${nome}`}/>
      <span>{nome}</span>
    </li>
  );
}
