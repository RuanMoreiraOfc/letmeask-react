import styles from './styles.module.scss';

import logoImg from '../../assets/icons/logo.svg';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import ButtonRoomCode from '../ButtonRoomCode';

export default HeaderRoom;

type HeaderRoomProps = {
   roomCode: string;
   children?: ReactNode;
}

function HeaderRoom( { roomCode, children }: HeaderRoomProps ) {
   const { containerBox } = styles;

   return (
      <header className={ containerBox }>
         <section>
            <Link to='/'><img src={logoImg} alt="Letmeask"/></Link>
            <div>
               <ButtonRoomCode code={ roomCode } />
               { children }
            </div>
         </section>
      </header>
   );
}