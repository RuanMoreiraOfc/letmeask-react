import './styles/global.scss';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

export default App;

function App() {
   return (
      <BrowserRouter>
         <AuthContextProvider>
            <Switch>
               <Route path="/" exact component={ Home } />
               <Route path="/rooms/new" component={ NewRoom } />
               <Route path="/rooms/:id" component={ Room } />
               <Redirect to="/"/>
            </Switch>
         </AuthContextProvider>
      </BrowserRouter>
   );
}