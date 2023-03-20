import Quantity from '../quantity/Quantity';
import './ProductCard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../../redux/features/cart/cartSlice';
import { useState } from 'react';

const ProductCard = ({ product, isOnProductsPage }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoggedIn } = useSelector((state) => state.auth);
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = () => {
		if (!isLoggedIn) return navigate('/login');
		dispatch(addItemToCart({ productId: product.id, quantity }));
	};
	const handleBuyNow = () => {
		if (!isLoggedIn) return navigate('/login');
		dispatch(addItemToCart({ productId: product.id, quantity }));
		navigate(`/cart`);
	};
	return (
		<div
			className={`product-card ${
				isOnProductsPage && 'product-card--on-products-page'
			}`}
		>
			<div className='product-card__image '>
				<img src={product?.imageURL} alt={product?.name} />
			</div>
			<div className='product-card__info'>
				<h2 className='product-card__info__name'>{product?.name}</h2>
				<p className='product-card__info__category'>{product?.category}</p>

				<p className='product-card__info__description'>
					{product?.description}
				</p>

				<p className='product-card__info__price'>$ {product?.price}</p>
				{!isOnProductsPage && (
					<div className='product-card__info__tools m-t--20'>
						<div className='product-card__info__tools__quanter'>
							<label className='product-card__info__details__label'>
								<Quantity
									max={product?.quantity}
									quantity={quantity}
									setQuantity={setQuantity}
								/>
							</label>
						</div>
						<div className='product-card__info__tools__buttons m-t--40'>
							<button
								className='btn btn--add-to-cart'
								onClick={handleAddToCart}
							>
								ADD TO CART
							</button>
							<button className='btn btn--buy' onClick={handleBuyNow}>
								BUY NOW
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
