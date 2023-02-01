import { Route, Routes } from 'react-router-dom';
import './default.scss';
// import bucket from './assets/svgs/bucket.svg';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './layouts/Layout';
import Navbar from './components/Navbar/Navbar';

// pages
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ProductPage from './pages/product/ProductPage';
import { useEffect, useState } from 'react';
import { auth } from './firebase/utils';
function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((usr) => {
			if (usr) setUser(usr.email);
			else setUser(null);
		});
	}, []);

	const header = <Header />;
	const navbar = <Navbar user={user} />;
	const footer = <Footer />;
	const content = (
		<>
			<Routes>
				<Route path='/' element={<HomePage user={user} />} />
				<Route path='/registration' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage user={user} />} />
				<Route
					path='/products/:productId/product-details'
					element={<ProductPage />}
				/>
			</Routes>
		</>
	);

	return (
		<div className='App'>
			<Layout
				header={header}
				navbar={navbar}
				content={content}
				footer={footer}
			/>
		</div>
	);
}

export default App;
