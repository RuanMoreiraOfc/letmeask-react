import { useState, useEffect } from "react";

import useAuth from "./UseAuth";

import { firebase, database } from "../services/firebase";

export default useRoom;

type RoomType = {
    title?: string;
    authorId?: string;
    closedAt?: string;
}

type FirebaseQuestionType = {
    content: string;

    author: {
       name: string;
       avatar: string;
    }

    isAnsewered: boolean;
    isHighlighted: boolean;

    likes: Record<string, {
        authorId: string;
    }>
}

type ParsedQuestionType = Omit<FirebaseQuestionType, 'likes'> & {
    id: string;
    likeId: string | undefined;
    likesCount: number
};

// ----

function useRoom( roomCode: string ) {
    const { user } = useAuth();

    const [isClosed, setIsClosed] = useState(false);

    const [title, setTitle] = useState<string>();
    const [questions, setQuestions] = useState<ParsedQuestionType[]>([]);

    // ----

    useEffect(() => {
        const thisRoomRefString = `rooms/${roomCode}`;

        const thisRoomRef = database.ref(thisRoomRefString);
        const questionsRef = database.ref(`${thisRoomRefString}/questions`);

        // ----

        thisRoomRef.once( 'value', roomState => {
            const roomData: RoomType = roomState.val();

            const titleState = roomData?.title || '';
            const closedState = Boolean( roomData?.closedAt );

            // ----

            setTitle( titleState );
            setIsClosed( closedState );
        } );

        thisRoomRef.on( 'child_added', roomState => {
            const closedState = Boolean( roomState.key === 'closedAt' );

            setIsClosed( closedState );
        } );

        // ***

        function CreateNewQuestion( questionState: firebase.database.DataSnapshot ) {
            const { likes: likesData, ...data }: FirebaseQuestionType = questionState.val();

            const id = questionState.key || '';
            const likeId = Object.entries(likesData || {}).find( ([key, like]) => like.authorId === user?.id )?.[0];
            const likeCount = Object.values(likesData || {}).length;

            // ----

            const parsedQuestion: ParsedQuestionType = { id, likesCount: likeCount, likeId, ...data };

            return parsedQuestion;
        }

        questionsRef.on( 'child_added', questionState => {
            const newQuestion = CreateNewQuestion( questionState );

            setQuestions( lastState => {
                if ( lastState.find( e => e.id === newQuestion.id ) ) return lastState;

                return [newQuestion, ...lastState];
            } );
        } );

        questionsRef.on( 'child_changed', questionState => {
            const id = questionState.key || '';

            const updatedQuestion = CreateNewQuestion( questionState );

            setQuestions( lastState => lastState.map( e => e.id !== id ? e : updatedQuestion ) );
        } );

        questionsRef.on( 'child_removed', questionState => {
            const id = questionState.key || '';

            // ----

            setQuestions( lastState => lastState.filter( e => e.id !== id ) );
        } );

        // ***

        function unsubscribe() {
            thisRoomRef.off( 'child_added' );

            // ***

            questionsRef.off( 'child_added' );
            questionsRef.off( 'child_changed' );
            questionsRef.off( 'child_removed' );
        }

        return unsubscribe;
    }, [roomCode, user?.id]);

    return { isClosed, title, questions }
}