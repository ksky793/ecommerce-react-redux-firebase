import './Footer.scss';
import './media-queries.scss';
import {
	AiOutlineInstagram,
	AiFillFacebook,
	AiOutlineTwitter,
} from 'react-icons/ai';
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
							<AiOutlineInstagram />
						</div>
						<div className='footer-icon'>
							<AiFillFacebook />
						</div>
						<div className='footer-icon'>
							<AiOutlineTwitter />
						</div>
					</div>
					<p>Copyright. All rights reserved</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
