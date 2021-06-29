import styles from '../styles/room.module.scss';

import { useEffect, MouseEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useAuth from '../hooks/UseAuth';
import useRoom from '../hooks/UseRoom';

import { database } from '../services/firebase';

import HeaderRoom from '../components/HeaderRoom';
import Button from '../components/Button';
import QuestionBox from '../components/QuestionBox';

export default AdminRoom;

type RoomParamsType = {
   id: string;
}

function AdminRoom() {
   const history = useHistory();
   const { id: roomCode } = useParams<RoomParamsType>();

   const { user } = useAuth();
   const { isClosed, title, questions } = useRoom(roomCode);

   useEffect( () => {
      const roomRef = database.ref(`rooms/${roomCode}`);

      roomRef.get().then( roomState => {
         if ( user?.id === roomState.val()?.authorId ) return;

         if ( !title ) return;

         history.replace('/');
      } );

      roomRef.on( 'child_removed', state => {
         if ( state.key === 'title' ) history.replace('/');
      } );

      function unsubscribe() {
         roomRef.off( 'child_removed' );
      }

      return unsubscribe;
   } , [title, roomCode, user?.id, history] );

   const isLoading = !title;

   // ***

   const {
      containerBox
      , loadingBox
      , contentBox
      , questionsBox
         , deleteBox
   } = styles;

   return (
      <div className={ containerBox }>
         <HeaderRoom roomCode={ roomCode } >
            { !isLoading && (
               <Button
                  isOutlined
                  disabled={ isClosed }
                  onClick={ InitEndRoomHandle(roomCode, history) }
               >
                  Encerrar Sala
               </Button>
            ) }
         </HeaderRoom>

         { isLoading && ( <span className={ loadingBox }/> ) }

         <main
            className={ contentBox }
            style={ isLoading ? {display: 'none'} : {} }
         >
            <header>
               <h1>Sala - { title }</h1>
               { questions.length > 0 && ( <span>{ questions.length } pergunta(s)</span> ) }
            </header>

            <ul className={ questionsBox }>
               { [...questions].sort( (a, b) => b.likesCount - a.likesCount ).map( ({ id: questionId, likeId, likesCount, ...rest }) => (
                  <QuestionBox key={ questionId } {...rest}>
                     <li>
                        <button
                           type="button"
                           disabled={ !user }
                           className={ deleteBox }
                           onClick={ InitDeleteQuestionHandle(roomCode, questionId) }
                           aria-label="Deletar essa Pergunta"
                           data-alt="Delete"
                        />
                     </li>
                  </QuestionBox>
               ) ) }
            </ul>

         </main>
      </div>
   );
}

// #region Private Functions

function InitEndRoomHandle(
   roomCode: string
   , history: any
) {
   async function Handle( { currentTarget: element }: MouseEvent<HTMLButtonElement> ) {
      element.disabled = true; // -----I

      if ( window.confirm('Deseja realmente encerrar essa sala?') ) {
         await database.ref(`rooms/${roomCode}`).update({
            closedAt: new Date()
         });

         history.push('/');
      }

      element.disabled = false; // -----O
   }

   return Handle;
}

function InitDeleteQuestionHandle(
   roomCode: string
   , questionCode: string
) {
   async function Handle( { currentTarget: element }: MouseEvent<HTMLButtonElement> ) {
      element.disabled = true; // -----I

      if ( window.confirm('Deseja realmente excluir essa pergunta?') ) {
         await database.ref(`rooms/${roomCode}/questions/${questionCode}`).remove();
      }

      element.disabled = false; // -----O
   }

   return Handle;
}

// #endregion Private Functions