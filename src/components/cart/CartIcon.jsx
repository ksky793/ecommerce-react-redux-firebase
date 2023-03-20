import { BsCart2 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import './CartIcon.scss';
const CartIcon = () => {
	const { cartItems } = useSelector((state) => state.cart);
	return (
		<div className='cart-icon-container'>
			<BsCart2 className='ic navbar__icons__icon ' />
			{cartItems.length > 0 && (
				<div className='cart-icon-container__circle'>
					<span className='cart-icon-container__circle__quantity'>
						{cartItems.length}
					</span>
				</div>
			)}
		</div>
	);
};

export default CartIcon;
