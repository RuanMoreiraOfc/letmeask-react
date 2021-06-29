import styles from './styles.module.scss';

import { ReactNode } from 'react';

export default QuestionBox;

type QuestionBoxType = {
   content: string;

   author: {
      name: string;
      avatar: string;
   }

   isAnswered?: boolean;
   isHighlighted?: boolean;

   children?: ReactNode;
}

function QuestionBox( {
   children
   , content
   , author: { name, avatar }
   , isAnswered = false
   , isHighlighted = false
}: QuestionBoxType ) {
   const {
      containerBox
         , highlightedContainer
         , answeredContainer
      , userInfoBox
   } = styles;

   const enhancedContainer = (() => {
      const containerClasses = [containerBox];

      if ( isAnswered ) containerClasses.push(answeredContainer);
      if ( isHighlighted ) containerClasses.push(highlightedContainer);

      return containerClasses.join(' ');
   })();

   return (
      <li className={ enhancedContainer }>
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