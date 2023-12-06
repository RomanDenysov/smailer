import {
	Route, RouterProvider, Navigate, createBrowserRouter, createRoutesFromElements
} from 'react-router-dom'
import GlobalStyles from '@styles/GlobalStyles'; // Импорт глобальных стилей, можно и в App.tsx
import Theme from '@styles/Theme'
import { ThemeProvider } from 'styled-components'
import Header from '@common/Header';
import URLList from '@pages/URLList';
import Login from '@auth/Login';
import RequireAuth from '@providers/RequireAuth';
import AuthStore from '@store/AuthStore';
import { createContext, useContext, useEffect } from 'react';
import ForgotPassword from '@auth/ForgotPassword';
import Register from '@auth/Register';
import InfoPage from '@pages/Info';
import { observer } from "mobx-react-lite";

interface State {
	store: AuthStore,
}
const store = new AuthStore();
export const Context = createContext<State>({store})



const router = createBrowserRouter(createRoutesFromElements(
	<>
		
			<Route path='/' element={<Header />}>
				<Route index element={<RequireAuth><URLList/></RequireAuth>}/>
			</Route>
		 	<Route path='/' element={<Header />}>
				<Route path='info' element={<InfoPage/>}/>
				<Route path='login' element={<Login/>}/>
				<Route path='forgot' element={<ForgotPassword/> }/>
				<Route path='register' element={<Register/>}/>
			</Route>
			
		
	</>
))



function App() {
	const {store} = useContext(Context)
	useEffect(()=> {
		if(localStorage.getItem('token')){
			store.checkAuth()
		}
	}, [])

	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles/>
			<Context.Provider value={{store}}>
				<RouterProvider router={router} /> 
			</Context.Provider>

		</ThemeProvider>
	)
}

export default observer(App)