import styles from '../styles/room.module.scss';

import { useState, useEffect, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useAuth from '../hooks/UseAuth';

import { database } from '../services/firebase';

import Button from '../components/Button';
import HeaderRoom from '../components/HeaderRoom';

export default Room;

type RoomParamsType = {
   id: string;
}

type FirebaseQuestionType = {
   content: string;

   author: {
      name: string;
      avatar: string;
   }

   isAnsewered: boolean;
   isHighlighted: boolean;
}

type QuestionType = RoomParamsType & FirebaseQuestionType;

function Room() {
   const [isLoading, setIsLoading] = useState(true);

   const [title, setTitle] = useState('');
   const [questions, setQuestions] = useState<QuestionType[]>([]);
   const [newQuestion, setNewQuestion] = useState('');

   const { user, SingInWithGoogle } = useAuth();
   const { id: roomCode } = useParams<RoomParamsType>();
   const history = useHistory();

   // ***

   useEffect(() => {
      const thisRoom = `rooms/${roomCode}`;

      const roomRef = database.ref(thisRoom);
      const questionsRef = database.ref(`${thisRoom}/questions`);

      // ----

      roomRef.once( 'value', roomState => {
         const roomData = roomState.val();

         if ( !roomData ) {
            history.replace('/');
            return;
         }

         setTitle( roomData.title );
         setIsLoading( false );
      } );

      // ***

      questionsRef.on( 'child_added', questionState => {
         const id = questionState.key || '';
         const data: FirebaseQuestionType = questionState.val();

         const parsedQuestion: QuestionType = { id, ...data };

         setQuestions( lastState => lastState.concat(parsedQuestion) );
      } );

      // ***

      function unsubscribe() {
         questionsRef.off( 'child_added' );
      }

      return unsubscribe;
   }, [roomCode, history]);

   // ***

   const {
      containerBox
      , loadingBox
      , contentBox
      , userBox
   } = styles;

   return (
      <div className={ containerBox }>
         <HeaderRoom roomCode={ roomCode }/>

         { isLoading && ( <span className={ loadingBox }/> ) }

         <main
            className={ contentBox }
            style={ isLoading ? {display: 'none'} : {} }
         >
            <header>
               <h1>Sala - { title }</h1>
               { questions.length > 0 && ( <span>{ questions.length } pergunta(s)</span> ) }
            </header>

            <form onSubmit={ InitSendQuestionHandle( newQuestion, setNewQuestion ) }>
               <textarea
                  placeholder="O que deseja perguntar?"
                  onChange={ InitChangeQuestionHandle( setNewQuestion ) }
                  onKeyDown={ InitSendQuestionByKeyboardHandle() }
                  value={ newQuestion }
               />

               <footer>
                  { !user ? (
                     <span>Para enviar uma pergunta, <button type="button" onClick={ SingInWithGoogle }>faça seu login</button></span>
                  ) : (
                     <div className={ userBox }>
                        <img src={ user.avatar } alt={ user.name } />
                        <span>{ user.name }</span>
                     </div>
                  ) }
                  <Button type="submit" disabled={ !user || !newQuestion } >Enviar Pergunta</Button>
               </footer>
            </form>

         <pre style={ { whiteSpace: 'pre-wrap' } }>{JSON.stringify( questions )}</pre>
         </main>
      </div>
   );
}

// #region Private Functions

function InitSendQuestionHandle( newQuestion: string, setNewQuestion: (value: string) => void ) {
   const { user } = useAuth();
   const { id: roomCode } = useParams<RoomParamsType>();

   async function Handle( event: FormEvent ) {
      event.preventDefault();

      // ***

      if ( newQuestion.trim() === '' ) return;

      if ( !user ) throw new Error('You must be logged in');

      // ***

      const question = {
         content: newQuestion
         , author: {
            name: user?.name
            , avatar: user?.avatar
         }
         , isAnsewered: false
         , isHighlighted: false
      }

      setNewQuestion('');

      await database.ref(`rooms/${roomCode}/questions`).push(question);
   }

   return Handle;
}

function InitChangeQuestionHandle( setNewQuestion: (value: string) => void ) {
   function Handle( { target: { value } }: ChangeEvent<HTMLTextAreaElement> ) {
      setNewQuestion( value );
   }

   return Handle;
}

function InitSendQuestionByKeyboardHandle( key: string = 'Enter' ) {
   function Handle( { repeat, ctrlKey: isValid, key: pressedKey, currentTarget: { form } }: KeyboardEvent<HTMLTextAreaElement> ) {
      if ( repeat ) return;

      if ( !isValid ) return;

      if ( pressedKey !== key ) return;

      form?.querySelector<HTMLInputElement>('[type=submit]')?.click();
   }

   return Handle;
}

// #endregion Private Functions