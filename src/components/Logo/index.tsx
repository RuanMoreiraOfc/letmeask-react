import styles from './styles.module.scss';

export default Logo;

type LogoProps = {
   className?: string;
}

function Logo( { className }: LogoProps ) {
   const { containerBox } = styles;

   const enhancedContainer = (()=>{
      const container = [containerBox];

      if ( className ) container.push(className);

      return container.join(' ');
   })();

   return (
      <i className={ enhancedContainer }/>
   );
}