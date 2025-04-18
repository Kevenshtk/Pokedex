import './styles.sass';
import { useState } from 'react'
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

  function mudarImagem(opt) {
    setImgAtual(opt);
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
            text={'<'}
            className={'btn-seta'}
            onClick={() => mudarImagem('front')}
          />
          <img
            src={
              imgAtual === 'front' ? image.front_default : image.back_default
            }
            alt={nome}
          />
          <Button
            text={'>'}
            className={'btn-seta'}
            onClick={() => mudarImagem('back')}
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
