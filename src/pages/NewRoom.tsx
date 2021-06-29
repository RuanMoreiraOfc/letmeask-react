import styles from '../styles/auth.module.scss';

import logoImg from '../assets/icons/logo.svg';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useAuth from '../hooks/UseAuth';

import { database } from '../services/firebase';

import AsideInfo from '../components/AsideInfo';
import ButtonSignOut from '../components/ButtonSignOut';
import Button from '../components/Button';

export default NewRoom;

function NewRoom() {
   const [newRoom, setNewRoom] = useState('');

   const { user } = useAuth();
   const history = useHistory();

   // ***

   useEffect(() => { !user && history.replace('/') }, [user, history]);

   // ***

   const {
      containerBox
      , contentBox
      , newRoomBox
   } = styles;

   return (
      <div className={ containerBox }>
         <AsideInfo />
         <ButtonSignOut />

         <main>
            <section className={ `${contentBox} ${newRoomBox}` }>
               <img src={ logoImg } alt="Letmeask" />
               <h2>Criar uma nova sala</h2>
               <form onSubmit={ InitCreateRoomHandle( newRoom ) }>
                  <input
                     type="text"
                     placeholder="Digite o nome da sala"
                     value={ newRoom }
                     onChange={ InitChangeRoomHandle( setNewRoom ) }
                  />
                  <Button type="submit">Criar sala</Button>
                  <p>Deseja entrar em uma sala existente? <Link to='/' replace>clique aqui</Link></p>
               </form>
            </section>
         </main>
      </div>
   );
}

// #region Private Functions

function InitCreateRoomHandle( newRoom: string ) {
   const { user } = useAuth();
   const history = useHistory();

   async function Handle(event: FormEvent) {
      event.preventDefault();

      if ( newRoom.trim() === '' ) return;

      const roomRef = database.ref('rooms');

      const submitter: HTMLButtonElement = event.currentTarget.querySelector("[type='submit']") || {} as HTMLButtonElement;

      submitter.disabled = true;

      const firebaseRooms = await roomRef.push({
         title: newRoom
         , authorId: user?.id
      });

      history.push( `/admin/rooms/${firebaseRooms.key}` )
   }

   return Handle;
}

function InitChangeRoomHandle( setNewRoom: (value: string) => void ) {
   function Handle( { target: { value } } : ChangeEvent<HTMLInputElement>) {
      setNewRoom( value );
   }

   return Handle;
}

// #endregion Private Functions