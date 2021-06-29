import styles from '../styles/auth.module.scss';

import logoImg from '../assets/icons/logo.svg';
import googleIconImg from '../assets/icons/google-icon.svg';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/UseAuth';

import { database } from '../services/firebase';

import AsideInfo from '../components/AsideInfo';
import Button from '../components/Button';

export default Home;

function Home() {
   const [roomCode, setRoomCode] = useState('');

   // ***

   const {
      containerBox
      , contentBox

      , contentSeparator

      , btnCreateRoom
   } = styles;

   return (
      <div className={ containerBox }>
         <AsideInfo />

         <main>
            <section className={ contentBox }>
               <img src={ logoImg } alt="Letmeask" />
               <Button
                  className={ btnCreateRoom }
                  onClick={ InitCreateRoomHandle() }
               >
                  <img src={ googleIconImg } alt="Logo da Google" />
                  Crie uma sala com a Google
               </Button>
               <div className={ contentSeparator }>ou entre em uma sala</div>
               <form onSubmit={ InitJoinRoomHandle( roomCode ) }>
                  <input
                     type="text"
                     placeholder="Digite o código da sala"
                     value={ roomCode }
                     onChange={ InitChangeRoomHandle( setRoomCode ) }
                  />
                  <Button type="submit">Entrar na sala</Button>
               </form>
            </section>
         </main>
      </div>
   );
}

// #region Private Functions

function InitCreateRoomHandle() {
   const { user, SignInWithGoogle } = useAuth();
   const history = useHistory();

   async function Handle() {
      if ( !user ) await SignInWithGoogle();

      history.replace('/rooms/new');
   }

   return Handle;
}

function InitJoinRoomHandle( roomCode: string ) {
   const history = useHistory();

   async function Handle(event: FormEvent) {
      event.preventDefault();

      if ( roomCode.trim() === '' ) return;

      // ***

      const submitter: HTMLButtonElement = event.currentTarget.querySelector("[type='submit']") || {} as HTMLButtonElement;

      submitter.disabled = true; // ----I

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      submitter.disabled = false; // ----O

      if ( !roomRef.exists() ) {
         alert('Room does not exists!');
         return;
      }

      if ( roomRef.val().closedAt ) {
         alert('Room is already closed!');
         return;
      }

      // ***

      history.push( `/rooms/${roomRef.key}` );
   }

   return Handle;
}

function InitChangeRoomHandle( setRoomCode: (value: string) => void ) {
   function Handle( { target: { value } }: ChangeEvent<HTMLInputElement> ) {
      setRoomCode(value);
   }

   return Handle;
}

// #endregion Private Functions