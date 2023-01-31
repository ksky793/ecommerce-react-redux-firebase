import Header from '../../components/Header/Header';
import AboutProducts from '../../components/AboutProducts/AboutProducts';
const HomePage = (props) => {
	return (
		<div className='home-page'>
			<h1>Witaj {props.user}!</h1>
			<Header />
			<AboutProducts />
		</div>
	);
};

export default HomePage;
