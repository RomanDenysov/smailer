import Theme from '@assets/styles/Theme';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './AuthProviders/AuthContext';
import GlobalStyles from '@assets/styles/GlobalStyles';
import AuthStore from '@store/AuthStore';
import { observer } from 'mobx-react-lite';

const store = new AuthStore();

interface ProvidersWrapperProps {
  children: React.ReactNode;
}

const MainProvider: React.FC<ProvidersWrapperProps> = observer(({ children }) => {

    useEffect(()=> {
		if(localStorage.getItem('token')){
			store.checkAuth()
		}
	}, [])

  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyles/>
        <AuthProvider store={store}>
            {children}
        </AuthProvider>
    </ThemeProvider>
)
});

export { MainProvider };