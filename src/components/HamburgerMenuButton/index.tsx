import styles from './styles.module.scss';

import { useState, useEffect, useCallback, useRef, ReactNode, PointerEvent } from 'react';

import DarkModeSwitch from '../DarkModeSwitch';

export default HamburgerMenuButton;

type HamburgerMenuButtonProps = {
   children: ReactNode;
}

function HamburgerMenuButton( { children }: HamburgerMenuButtonProps ) {
   const buttonRef = useRef<HTMLLabelElement>(null);
   const contentRef = useRef<HTMLElement>(null);
   const [checked, setChecked] = useState<boolean>();

   const utilGetMaxWidth = ( element: Element | null ) => element?.clientWidth || 0;
   const utilGetScrollBarWidth = () => window.innerWidth - document.documentElement.clientWidth;

   function OnRefLoad( callback: ( button: HTMLLabelElement, content: HTMLElement ) => void ) {
      if ( buttonRef?.current === null ) return;
      if ( contentRef?.current === null ) return;

      const { current: button } = buttonRef;
      const { current: content } = contentRef;

      callback( button, content );
   }

   const RepositionBurgerMenu = useCallback( function(button: HTMLLabelElement, content: HTMLElement ) {
      const checkbox = document.querySelector<HTMLElement>(`#${button.htmlFor}`);

      if ( !checkbox ) return;

      if ( checkbox.dataset.isActive !== 'true' ) return;

      button.style.transform = `translateX( calc(${ utilGetMaxWidth( content.firstElementChild ) - utilGetScrollBarWidth() }px - 100%) )`;
   }, [])

   useEffect( () => {
      const subscribe = OnRefLoad.bind(null, RepositionBurgerMenu);

      window.addEventListener( 'resize', subscribe );

      // ***

      return () => window.removeEventListener( 'resize', subscribe );
   }, [RepositionBurgerMenu] );

   useEffect( () => {
      OnRefLoad( ( button, content ) => {
         if ( !checked ) {
            button.style.removeProperty('transform');
            return;
         }

         button.style.transitionDuration = getComputedStyle(content).animationDuration;
         RepositionBurgerMenu(button, content)
      } );
   }, [checked, RepositionBurgerMenu] );

   useEffect( () => {
      const xGetter = () => utilGetMaxWidth(contentRef?.current) || utilGetMaxWidth(document.body);
      const callback = () => setChecked(false);
      const Handler = InitPointerIsOutSideHandle( xGetter, callback );

      document.addEventListener( 'pointerdown', Handler as any );

      // ***

      return () => document.removeEventListener( 'pointerdown', Handler as any );
   }, [] );

   // ***

   const {
      containerBox
      , contentBox
      , switchBox
         , isDuplicated
   } = styles;


   useEffect( () => {
      const repeatedSwitch = document.querySelector(`#rc-dms:not(.${switchBox})`);

      if ( !repeatedSwitch ) return;

      repeatedSwitch.classList.add( isDuplicated );

      return () => repeatedSwitch.classList.remove( isDuplicated );
   }, [switchBox, isDuplicated] );

   return (
      <section className={ containerBox }>
         <input
            type="checkbox"
            id="rc-hbm"
            data-is-active={ checked }
            onChange={ () => setChecked(e => !e) }
            role="switch"
            aria-checked={ Boolean(checked) }
            aria-label="Toggle Menu Dropdown"
         />
         <label htmlFor="rc-hbm" ref={ buttonRef }>
            <span/>
            <span/>
            <span/>
         </label>

         <section className={ contentBox } ref={ contentRef }>
            <div>
               {children}
            </div>
            <div>
               {  checked && <DarkModeSwitch className={ switchBox } /> }
            </div>
         </section>
      </section>
   );
}

// ***

function InitPointerIsOutSideHandle( xLimitGetter: () => number, callback: () => void ) {
   function Handle( { pageX }: PointerEvent ) {
      if ( pageX <= xLimitGetter() ) return;

      callback();
   }

   return Handle;
}