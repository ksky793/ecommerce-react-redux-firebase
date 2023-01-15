import { Route, Routes } from 'react-router-dom';
import './default.scss';
import bucket from './assets/svgs/bucket.svg';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './layouts/Layout';
import Navbar from './components/Navbar/Navbar';

// pages
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
	const header = <Header />;
	const navbar = <Navbar />;
	const footer = <Footer />;
	const content = (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/registration' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
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
