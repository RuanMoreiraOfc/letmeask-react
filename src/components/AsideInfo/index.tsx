import styles from './styles.module.scss';

import illustrationImg from '../../assets/icons/illustration.svg';

export default AsideInfo;

function AsideInfo() {
   const { containerBox } = styles;

   return (
      <aside className={ containerBox }>
         <img src={ illustrationImg } alt="Ilustração simbolizando pergunta em respostas" />
         <strong>Crie salas de Q&amp;A ao-vivo</strong>
         <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
   );
}