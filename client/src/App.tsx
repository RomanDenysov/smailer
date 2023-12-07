import { RouterProvider } from 'react-router-dom'
import { router } from '@pages/index';
import { MainProvider } from '@providers/MainProvider';

function App() {
	return (
		<MainProvider>
			<RouterProvider router={router} /> 
		</MainProvider>
	)
}

export default App