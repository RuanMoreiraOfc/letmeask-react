import styles from './styles.module.scss';

import { Fragment } from 'react';

import useAuth from '../../hooks/UseAuth';

export default ButtonSignOut;

function ButtonSignOut( ) {
   const { user, SignOut } = useAuth();

   // ***

   const { containerBox } = styles;

   return (
      <Fragment>
         { user && (
            <button
               title="Deseja Sair?"
               type="button"
               onClick={ SignOut }
               className={ containerBox }
            >
               <img src={ user.avatar } alt={ user.name } />
            </button>
         ) }
      </Fragment>
   );
}