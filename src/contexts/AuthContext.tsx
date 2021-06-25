import { createContext, useState, useEffect, ReactNode } from "react";

import { firebase, auth } from '../services/firebase';

export {
   Context as AuthContext,
   ContextProvider as AuthContextProvider,
};

type UserType = {
   id: string;
   name: string;
   avatar: string;
}

type ContextType = {
   user: UserType | undefined;

   SingInWithGoogle: () => Promise<void>;
}

const Context = createContext({} as ContextType);

//

type ProviderProps = {
   children: ReactNode;
}

function ContextProvider( { children }: ProviderProps ) {
   const [ user, setUser ] = useState<UserType>();

   useEffect( () => {
      const unsubscribe = auth.onAuthStateChanged( user => {
         if ( !user ) return;

         // ***

         setUser( VerifyUserData(user) );
      } );

      return unsubscribe;
   }, [] );

   async function SingInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      const { user } = await auth.signInWithPopup( provider );

      // ----

      if ( !user ) return;

      // ***

      setUser( VerifyUserData( user ) );
   }

   // ***

   return (
      <Context.Provider value={{
         user

         , SingInWithGoogle
      }}>
         { children }
      </Context.Provider>
   );
}

// #region Private Functions

   function VerifyUserData(user: firebase.User): UserType {
      const {
         uid: id
         , displayName: name
         , photoURL: avatar
      } = user;

      if ( !name || !avatar ) throw new Error('Missing information from Google Account.');

      // ***

      const filledUser = {
         id
         , name
         , avatar
      };

      return filledUser;
   }

   // #endregion Private Functions