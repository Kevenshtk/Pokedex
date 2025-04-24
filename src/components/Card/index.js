import './styles.sass';
import { useState } from 'react';
import imgErro from '../../assets/triangle-exclamation-solid.svg';
import imgLeft from '../../assets/arrow-left-solid.svg';
import imgRight from '../../assets/arrow-right-solid.svg';
import Button from '../Button';

export default function Card({
  id,
  image,
  nome,
  tipo,
  habilidades,
  hp,
  ataque,
  defesa,
  velocidade,
}) {
  const [imgAtual, setImgAtual] = useState('front');

  function mudarImagem() {
    imgAtual === 'front' ? setImgAtual('back') : setImgAtual('front');
  }

  return (
    <div className={`cartao-pokemon ${tipo}`}>
      <div className="cartao-topo">
        <div className="nome-id">
          <h2 className="nome">{nome}</h2>
          <span>#{id}</span>
        </div>
        <span className="tipo">{tipo}</span>
        <div className="cartao-imagem">
          <Button
            text={`${imgLeft}`}
            className={'btn-seta'}
            onClick={() => mudarImagem()}
          />
          <img
            className={
              imgAtual === 'front'
                ? image.front_default === null && 'imgErro'
                : image.back_default === null && 'imgErro'
            }
            src={
              imgAtual === 'front'
                ? image.front_default !== null
                  ? image.front_default
                  : imgErro
                : image.back_default !== null
                  ? image.back_default
                  : imgErro
            }
            alt={nome}
          />
          <Button
            text={`${imgRight}`}
            className={'btn-seta'}
            onClick={() => mudarImagem()}
          />
        </div>
      </div>
      <div className="cartao-informacoes">
        <div className="status">
          <h3>Status</h3>
          <ul>
            <li>HP: {hp}</li>
            <li>Ataque: {ataque}</li>
            <li>Defesa: {defesa}</li>
            <li>Velocidade: {velocidade}</li>
            <li>Total: {hp + ataque + defesa + velocidade}</li>
          </ul>
        </div>
        <div className="habilidades">
          <h3>Habilidades</h3>
          <ul>
            {habilidades.map((habilidade) => (
              <li key={habilidade.id}>{habilidade}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
