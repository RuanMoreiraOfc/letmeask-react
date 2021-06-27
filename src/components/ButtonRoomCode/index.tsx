import styles from './styles.module.scss';

import copyImg from '../../assets/icons/copy.svg';

export default ButtonRoomCode;

type ButtonRoomCodeProps = {
   code: string;
}

function ButtonRoomCode( { code }: ButtonRoomCodeProps ) {
   function HandleCopyRoomCode() { navigator.clipboard.writeText(code); }

   // ***

   return (
      <button
         type="button"
         className={ styles.btnRoomCode }
         onClick={ HandleCopyRoomCode }
      >
         <div>
            <img src={ copyImg } alt="Copy room code" />
         </div>
         <span>Sala #{ code }</span>
      </button>
   );
}