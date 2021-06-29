import styles from './styles.module.scss';

import { ButtonHTMLAttributes } from 'react';

export default Button;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   isOutlined?: boolean;
};

function Button( { className, isOutlined, ...rest }: ButtonProps ) {
   const { commonBtn, outlinedBtn } = styles;

   const enhancedBtn = (() => {
      const btnClasses = [commonBtn];

      if ( className ) btnClasses.push(className);
      if ( isOutlined ) btnClasses.push(outlinedBtn);

      return btnClasses.join(' ');
   })();

   return (
      <button
         type="button"
         className={ enhancedBtn }
         { ...rest }
      />
   );
}