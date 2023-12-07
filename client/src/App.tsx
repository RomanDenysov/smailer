import { RouterProvider } from 'react-router-dom'
import GlobalStyles from '@styles/GlobalStyles'; // Импорт глобальных стилей, можно и в App.tsx
import Theme from '@styles/Theme'
import { ThemeProvider } from 'styled-components'

import AuthStore from '@store/AuthStore';
import { useEffect } from 'react';

import { observer } from "mobx-react-lite";
import { router } from '@pages/index';
import { AuthProvider } from '@providers/AuthContext';


const store = new AuthStore();



function App() {
	useEffect(()=> {
		if(localStorage.getItem('token')){
			store.checkAuth()
		}
	}, [])

	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles/>
			<AuthProvider store={store}>
				<RouterProvider router={router} /> 
			</AuthProvider>
		</ThemeProvider>
	)
}

export default observer(App)