import { Route, Routes } from 'react-router-dom';
import './default.scss';

// components
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Layout from './layouts/Layout';
import Navbar from './components/Navbar/Navbar';

// hoc
import WithAdminAuth from './hoc/WithAdminAuth';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
// pages
import HomePage from './pages/home/Home';
import RegisterPage from './pages/auth/Register';
import LoginPage from './pages/auth/Login';
import ProductPage from './pages/products/product/ProductPage';
import ResetPasswordPage from './pages/auth/ResetPassword';
import Admin from './pages/admin/Admin';
import AddProduct from './pages/admin/addProduct/AddProduct';
import Products from './pages/products/Products';
import AdminProducts from './pages/admin/products/Products';
import Cart from './pages/cart/Cart';

function App() {
	const header = <Header />;
	const navbar = <Navbar />;
	const footer = <Footer />;
	const content = (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/products' element={<Products />} />
				<Route path='/products/:productId' element={<ProductPage />} />
				<Route path='*' element={<>404 PAGE NOT FOUND</>} />

				{/* auth */}
				<Route path='/registration' element={<RegisterPage />} />
				<Route path='/password-reset' element={<ResetPasswordPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='/cart'
					element={
						<AuthenticatedRoute>
							<Cart />
						</AuthenticatedRoute>
					}
				/>

				{/* admin */}
				<Route
					path='/admin'
					element={
						<WithAdminAuth>
							<Admin />
						</WithAdminAuth>
					}
				>
					<Route path='products/add-product' element={<AddProduct />} />
					<Route path='products' element={<AdminProducts />} />
				</Route>
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
