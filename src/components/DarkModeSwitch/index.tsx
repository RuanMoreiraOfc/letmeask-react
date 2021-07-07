import styles from './styles.module.scss';

import darkModeImg from '../../assets/icons/dark-mode.svg';
import lightModeImg from '../../assets/icons/light-mode.svg';

import { useState, useEffect } from 'react';
import Switch from "react-switch";

export default DarkModeSwitch;

function DarkModeSwitch() {
   const [isActive, setIsActive] = useState(false);

   const queryName = 'prefers-color-scheme';

   useEffect( () => {
      const preferDark = window.matchMedia(`(${queryName}: dark)`).matches;
      const preferSavedConfig = localStorage.getItem(queryName) !== 'light';

      const preferConfig = preferSavedConfig && preferDark;

      setIsActive( preferConfig );
   }, []);

   useEffect( () => {
      const theme = isActive ? 'dark' : 'light'

      localStorage.setItem(queryName, theme);
      document.documentElement.className = `${theme}mode`;
   }, [isActive])

   // ***

   const {
      containerBox
      , iconBox
   } = styles;

   return (
      <div className={ containerBox }>
         <Switch
            aria-label="Toggle lightmode/darkmode"
            checked={ isActive }
            onChange={ () => setIsActive( e => !e ) }
            onColor='#45abcd'
            uncheckedIcon={
               <img className={ iconBox } src={ darkModeImg } alt="DarkMode"/>
            }
            checkedIcon={
               <img className={ iconBox } src={ lightModeImg } alt="LightMode"/>
            }
         />
      </div>
   );
}