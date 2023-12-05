import {
	Route, RouterProvider, Navigate, createBrowserRouter, createRoutesFromElements
} from 'react-router-dom'
import GlobalStyles from '@modules/styles/GlobalStyles'; // Импорт глобальных стилей, можно и в App.tsx
import Theme from '@modules/styles/Theme'
import { ThemeProvider } from 'styled-components'
import Header from '@common/components/Header';
import URLList from '@modules/url/components/URLList';
import Login from '@modules/authorization/components/Login';
import RequireAuth from '@modules/hoc/RequireAuth';
import AuthStore from '@modules/authorization/store/AuthStore';
import { createContext, useContext, useEffect } from 'react';
import ForgotPassword from '@modules/authorization/components/ForgotPassword';
import Register from '@modules/authorization/components/Register';
import InfoPage from '@modules/authorization/components/Info';
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