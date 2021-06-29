import styles from './styles.module.scss';

import { ReactNode } from 'react';

export default QuestionBox;

type QuestionType = {
   content: string;

   author: {
      name: string;
      avatar: string;
   }

   children?: ReactNode;
}

function QuestionBox( { children, content, author: { name, avatar } }: QuestionType ) {
   const {
      containerBox
      , userInfoBox
   } = styles;

   return (
      <li className={ containerBox }>
         <p>{ content }</p>

         <footer>
            <section className={ userInfoBox }>
               <img src={ avatar } alt={ name } />
               <span>{ name }</span>
            </section>

            <ul>{ children }</ul>
         </footer>
      </li>
   );
}