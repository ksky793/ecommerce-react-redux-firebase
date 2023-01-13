import './default.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import bucket from './assets/svgs/bucket.svg';

function App() {
	const header = <Header />;
	const navbar = <Navbar />;
	const footer = <Footer />;
	const content = <div></div>;

	return (
		<div className='App'>
			<Layout navbar={navbar} content={content} footer={footer} />
		</div>
	);
}

export default App;
