import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faInstagram,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import './Footer.scss';
import './media-queries.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='wrapper footer-container'>
				<div className='footer-top'>
					<div className='footer-col'>
						<ul>
							<li>CLETRON</li>
							<li>CLEAN PRODUCTS SHOP</li>
						</ul>
					</div>
					<div className='footer-col'>
						<ul>
							<li>HOME</li>
							<li>BLOG</li>
							<li>ABOUT US</li>
						</ul>
					</div>
					<div className='footer-col'>
						<ul>
							<li>PRODUCTS</li>
							<li>SHOP</li>
							<li>CONTACT US</li>
						</ul>
					</div>
				</div>
				<div className='footer-line'></div>
				<div className='footer-bottom'>
					<div className='footer-icons'>
						<div className='footer-icon'>
							<FontAwesomeIcon icon={faFacebookF} />
						</div>
						<div className='footer-icon'>
							<FontAwesomeIcon icon={faTwitter} />
						</div>
						<div className='footer-icon'>
							<FontAwesomeIcon icon={faInstagram} />
						</div>
					</div>
					<p>Copyright. All rights reserved</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
