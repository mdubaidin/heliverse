import React from 'react';
import './utils/axios';
import { Navigate, Route, Routes } from 'react-router-dom';

//pages
import Provider from './providers/Provider';
import NotFound from './components/NotFound';
import Users from './pages/users/Users';
import Teams from './pages/teams/Teams';
import UserDetails from './pages/users/Details';
import TeamDetails from './pages/teams/Details';

const App = () => {
    return (
        <Provider>
            <Routes>
                <Route path='/' element={<Navigate to='/users' />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<UserDetails />} />
                <Route path='/teams' element={<Teams />} />
                <Route path='/teams/:id' element={<TeamDetails />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Provider>
    );
};

export default App;
