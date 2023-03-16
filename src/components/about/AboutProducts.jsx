import './AboutProducts.scss';
import aboutProductsImage from '../../assets/images/aboutproducts.png';
const AboutProducts = () => {
	return (
		<section className='about-container'>
			<div className='wrapper about'>
				<div className='about__infos'>
					<h2 className='about__infos__main'>
						ABOUT <br /> PRODUCTS
					</h2>
					<p className='about__infos__description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
						earum at laudantium. Qui est veritatis et, sed obcaecati veniam
						dolores! Lorem ipsum dolor sit amet.
					</p>
					<button className='btn btn--home btn--size-big m-t--20 m-b--20'>
						READ MORE
					</button>
				</div>
				<img
					className='about__image'
					src={aboutProductsImage}
					alt='Hand cleaning'
				/>
			</div>
		</section>
	);
};

export default AboutProducts;
