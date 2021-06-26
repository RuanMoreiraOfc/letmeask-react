import styles from '../styles/auth.module.scss';

import illustrationImg from '../assets/icons/illustration.svg';
import logoImg from '../assets/icons/logo.svg';

import { Link } from 'react-router-dom';

import Button from '../components/Button';

export default NewRoom;

function NewRoom() {
   const {
      containerBox
      , contentBox
      , newRoomBox
   } = styles;

   return (
      <div className={ containerBox }>
         <aside>
            <img src={ illustrationImg } alt="Ilustração simbolizando pergunta em respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
         </aside>
         <main>
            <div className={ `${contentBox} ${newRoomBox}` }>
               <img src={ logoImg } alt="Letmeask" />
               <h2>Criar uma nova sala</h2>
               <form>
                  <input
                     type="text"
                     placeholder="Digite o nome da sala"
                  />
                  <Button type="submit">Criar sala</Button>
                  <p>Deseja entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
               </form>
            </div>
         </main>
      </div>
   );
}