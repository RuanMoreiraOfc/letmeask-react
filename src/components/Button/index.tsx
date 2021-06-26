import styles from './styles.module.scss';

import { ButtonHTMLAttributes } from 'react';

export default Button;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button( { className, ...rest }: ButtonProps ) {
   return (
      <button
         type="button"
         className={ styles.commonBtn + ( className ? ` ${className}` : '' ) }
         { ...rest }
      />
   );
}