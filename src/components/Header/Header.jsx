import shoppingBucketImage from '../../assets/images/header1.png';
import './Header.scss';
const Header = () => {
	return (
		<header className='header'>
			<div className='wrapper'>
				<div className='header-info'>
					<h1 className='header-main-text'>
						<span>AN EXCITING PLACE</span> FOR ALL CLEANERS <br></br>TO SHOP
					</h1>
					<p className='header-paragraph-text'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
						aliquid deleniti aspernatur delectus ex.
					</p>
					<button className='header-btn'>SHOP NOW</button>
				</div>
				<img
					className='header-img'
					src={shoppingBucketImage}
					alt='shopping bucket header'
				/>
			</div>
		</header>
	);
};

export default Header;
