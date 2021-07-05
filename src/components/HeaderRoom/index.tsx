import styles from './styles.module.scss';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo';
import ButtonRoomCode from '../ButtonRoomCode';
import ButtonSignOut from '../ButtonSignOut';

export default HeaderRoom;

type HeaderRoomProps = {
   roomCode: string;
   children?: ReactNode;
}

function HeaderRoom( { roomCode, children }: HeaderRoomProps ) {
   const {
      containerBox
      , logoBox
      , buttonsBox
   } = styles;

   return (
      <header className={ containerBox }>
         <section>
            <Link to='/'><Logo className={ logoBox } /></Link>
            <div className={ buttonsBox }>
               <div>
                  <ButtonRoomCode code={ roomCode } />
                  { children }
               </div>
               <ButtonSignOut />
            </div>
         </section>
      </header>
   );
}