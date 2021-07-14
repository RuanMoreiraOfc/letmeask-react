import styles from './styles.module.scss';

import { Fragment } from 'react';

import useAuth from '../../hooks/UseAuth';

export default ButtonSignOut;

function ButtonSignOut( ) {
   const { user, SignOut } = useAuth();

   function HandleSignOut() {
      if ( window.confirm('Deseja sair dessa conta?') === false ) return;

      SignOut();
   }

   // ***

   const { containerBox } = styles;

   return (
      <Fragment>
         { user && (
            <button
               title="Deseja sair dessa conta?"
               type="button"
               onClick={ HandleSignOut }
               className={ containerBox }
            >
               <img src={ user.avatar } alt={ user.name } />
            </button>
         ) }
      </Fragment>
   );
}