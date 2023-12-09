import {
	Route, createBrowserRouter, createRoutesFromElements
} from 'react-router-dom'

import RequireAuth from '@providers/AuthProviders/RequireAuth';

import Header from '@components/common/Header';
import SignForm from '@components/auth/SignForm';

import HomePage from '@pages/HomePage';
import InfoPage from '@pages/InfoPage';

export const router = createBrowserRouter(createRoutesFromElements(
	<>
        <Route path='/' element={<RequireAuth><Header /></RequireAuth>}>
            <Route index element={<RequireAuth><HomePage/></RequireAuth>}/>
        </Route>
        <Route path='info' element={<InfoPage />}/>
        <Route path='login' element={<SignForm type='login' />}/>
        <Route path='register' element={<SignForm type='register' />}/>
            
	</>
))