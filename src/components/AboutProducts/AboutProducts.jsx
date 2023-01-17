import './AboutProducts.scss';
import './media-queries.scss';
import aboutProductsImage from '../../assets/images/aboutproducts.png';
const AboutProducts = () => {
	return (
		<section className='section-about-products'>
			<div className='wrapper about-products-container'>
				<div className='about-products-infos'>
					<h2 className='about-products-main-text'>
						ABOUT <br /> PRODUCTS
					</h2>
					<p className='about-products-paragraph'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
						earum at laudantium. Qui est veritatis et, sed obcaecati veniam
						dolores! Lorem ipsum dolor sit amet.
					</p>
					<div className='about-products-buttons'>
						<button className='btn-view-items'>VIEW ITEMS</button>
						<button className='btn-read-more'>READ MORE</button>
					</div>
				</div>
				{/* <div className='about-products-image-container'></div> */}
				<img
					className='about-products-image-container'
					src={aboutProductsImage}
					alt='Hand cleaning'
				/>
			</div>
		</section>
	);
};

export default AboutProducts;
