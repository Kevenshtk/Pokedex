import './styles.sass';
import imgErro from '../../assets/triangle-exclamation-solid.svg';

export default function AsideItem({ image, nome, tipo, onClick }) {
  return (
    <li className={`pokemon ${tipo}`} onClick={onClick}>
      <img
        className={image === null && 'imgErro'}
        src={image === null ? imgErro : image}
        alt={`imagem pokemon ${nome}`}
      />
      <span>{nome}</span>
    </li>
  );
}
