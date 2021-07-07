import './styles/global.scss';

import { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

import DarkModeSwitch from './components/DarkModeSwitch';

export default App;

function App() {
   return (
      <Fragment>
         <DarkModeSwitch />
         <BrowserRouter>
            <AuthContextProvider>
               <Switch>
                  <Route path="/" exact component={ Home } />
                  <Route path="/rooms/new" component={ NewRoom } />
                  <Route path="/rooms/:id" component={ Room } />
                  <Route path="/admin/rooms/:id" component={ AdminRoom } />
                  <Redirect to="/"/>
               </Switch>
            </AuthContextProvider>
         </BrowserRouter>
      </Fragment>
   );
}