import { BiSearch, BiMenu } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// redux selectors
import {
	selectIsLoggedIn,
	selectUserInfo,
	LOGOUT_USER,
} from '../../redux/features/auth/authSlice';
// components
import CartIcon from '../cart/CartIcon';
// styles
import './Navbar.scss';

const Navbar = () => {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(selectIsLoggedIn);
	const userInfo = useSelector(selectUserInfo);

	return (
		<div className='wrapper'>
			<nav className='navbar'>
				<div className='navbar__logo'>
					<Link to='/'>CLETRON</Link>
				</div>
				<ul className='navbar__links'>
					<li className='navbar__links__link'>
						<Link to='/'>Home</Link>
					</li>
					<li className='navbar__links__link'>
						<Link to='/products'>Products</Link>
					</li>
					{isLoggedIn ? (
						<>
							{userInfo?.role === 'admin' && (
								<>
									<li className='navbar__links__link'>
										<Link to='/admin/products'>Admin</Link>
									</li>
								</>
							)}
							<li className='navbar__links__link'>
								<span
									onClick={() => {
										dispatch(LOGOUT_USER());
									}}
									className='navbar__links__link'
								>
									Logout
								</span>
							</li>
						</>
					) : (
						<>
							<li className='navbar__links__link'>
								<Link to='/login'>Login</Link>
							</li>
						</>
					)}
				</ul>

				<div className='navbar__icons'>
					{isLoggedIn && (
						<>
							<BiSearch className='ic navbar__icons__icon' />

							<Link to='/cart'>
								<CartIcon />
							</Link>
							<AiOutlineUser
								className='ic navbar__icons__icon'
								onClick={() => {
									dispatch(LOGOUT_USER());
								}}
							/>
						</>
					)}
					<BiMenu className='ic ic-menu navbar__icons__icon navbar__icons__icon--size-big' />
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
