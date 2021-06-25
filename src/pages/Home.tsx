import styles from '../styles/auth.module.scss';

import illustrationImg from '../assets/icons/illustration.svg';
import logoImg from '../assets/icons/logo.svg';
import googleIconImg from '../assets/icons/google-icon.svg';

import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/UseAuth';

import Button from '../components/Button';

export default Home;

function Home() {
   const { user, SingInWithGoogle } = useAuth();
   const history = useHistory();

   async function HandleCreateRoom() {
      if ( !user ) await SingInWithGoogle();

      history.push('/rooms/new');
   }

   // ***

   const {
      containerBox
      , contentBox

      , contentSeparator

      , btnCreateRoom
   } = styles;

   return (
      <div className={ containerBox }>
         <aside>
            <img src={ illustrationImg } alt="Ilustração simbolizando pergunta em respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
         </aside>
         <main>
            <div className={ contentBox }>
               <img src={ logoImg } alt="Letmeask" />
               <Button
                  className={ btnCreateRoom }
                  onClick={ HandleCreateRoom }
               >
                  <img src={ googleIconImg } alt="Logo da Google" />
                  Crie uma sala com a Google
               </Button>
               <div className={ contentSeparator }>ou entre em uma sala</div>
               <form>
                  <input
                     type="text"
                     placeholder="Digite o código da sala"
                  />
                  <Button
                     type="submit"
                  >
                     Entrar na sala
                  </Button>
               </form>
            </div>
         </main>
      </div>
   );
}