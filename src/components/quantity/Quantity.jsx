import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import './Quantity.scss';

function Quantity(props) {
	const handleQuantityChange = (event) => {
		const value = parseInt(event.target.value);
		props.setQuantity(value);
	};

	const handleDecrementClick = () => {
		if (props.quantity > 1) {
			props.setQuantity((prev) => (prev -= 1));
		}
	};

	const handleIncrementClick = () => {
		if (props.quantity < props.max) props.setQuantity((prev) => (prev += 1));
	};

	return (
		<div className='quantity'>
			<button
				className='quantity__button quantity__button--decrement'
				onClick={handleDecrementClick}
			>
				<AiOutlineMinus />
			</button>
			<input
				className='quantity__input'
				type='number'
				min='1'
				value={props.quantity}
				onChange={handleQuantityChange}
			/>
			<button
				className='quantity__button quantity__button--increment'
				onClick={handleIncrementClick}
			>
				<AiOutlinePlus />
			</button>
		</div>
	);
}

export default Quantity;
