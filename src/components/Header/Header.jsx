import { Link } from 'react-router-dom';
import shoppingBucketImage from '../../assets/images/header1.png';
import './Header.scss';
const Header = () => {
	return (
		<header className='header wrapper'>
			<div className='header__info'>
				<h1 className='header__info__main'>
					<span>AN EXCITING PLACE</span> FOR ALL CLEANERS <br></br>TO SHOP
				</h1>
				<p className='header__info__description'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
					aliquid deleniti aspernatur delectus ex.
				</p>

				<Link to='/products'>
					<button className='btn btn--home btn--size-big'>SHOP NOW</button>
				</Link>
			</div>
			<img
				className='header__img'
				src={shoppingBucketImage}
				alt='shopping bucket header'
			/>
		</header>
	);
};

export default Header;
