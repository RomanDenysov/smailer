import {
	Route, createBrowserRouter, createRoutesFromElements
} from 'react-router-dom'
import Header from '@common/Header';
import URLList from '@pages/HomePage';
import SignForm from '@components/auth/SignForm';
import RequireAuth from '@providers/RequireAuth';
import InfoPage from '@pages/InfoPage';

export const router = createBrowserRouter(createRoutesFromElements(
	<>
        <Route path='/' element={<RequireAuth><Header /></RequireAuth>}>
            <Route index element={<RequireAuth><URLList/></RequireAuth>}/>
        </Route>
        <Route path='info' element={<InfoPage />}/>
        <Route path='login' element={<SignForm type='login' />}/>
        <Route path='register' element={<SignForm type='register' />}/>
            
	</>
))