import styles from './styles.module.scss';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenuButton from '../HamburgerMenuButton';
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
      , contentBox
      , logoBox
      , buttonsBox
   } = styles;

   return (
      <header className={ containerBox }>
         <HamburgerMenuButton>
            <ButtonRoomCode code={ roomCode } />
            { children }
         </HamburgerMenuButton>

         <section className={ contentBox }>
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