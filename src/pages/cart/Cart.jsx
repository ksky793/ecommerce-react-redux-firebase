import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../components/table/Table';
import { fetchCategoriesAsync } from '../../redux/features/categories/categoriesSlice';
import { fetchProductsAsync } from '../../redux/features/products/productSlice';
import { removeItemFromCart } from '../../redux/features/cart/cartSlice';
import { FaSpinner } from 'react-icons/fa';
const Cart = () => {
	const dispatch = useDispatch();

	const { products, loading } = useSelector((state) => state.products);
	const { cartItems } = useSelector((state) => state.cart);
	const { categories } = useSelector((state) => state.categories);

	const [cartProducts, setCartProducts] = useState([]);
	const [cartSum, setCartSum] = useState();

	const handleRemoveClick = (id) => {
		dispatch(removeItemFromCart(id));
	};

	useEffect(() => {
		const newCartProducts = cartItems.map((cartItem) => {
			const product = products.find(
				(product) => product.id === cartItem.productId
			);
			return {
				...product,
				quantity: cartItem.quantity,
			};
		});
		setCartProducts(newCartProducts);

		// łączna suma produktów
		const sum = newCartProducts
			.reduce(
				(accumulator, currentProduct) =>
					accumulator + currentProduct.price * currentProduct.quantity,
				0
			)
			.toFixed(2);

		setCartSum(sum);
	}, [products, cartItems]);

	useEffect(() => {
		dispatch(fetchProductsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	return (
		<div className='cart p--70'>
			<div className='wrapper'>
				{loading ? (
					<FaSpinner className='spinner' />
				) : (
					<>
						<Table
							products={cartProducts}
							categories={categories}
							// handleRemoveClick={handleRemoveClick}
							onClick={handleRemoveClick}
						/>
						<h2>SUM: {cartSum}</h2>
						<button className='btn btn--buy'>Checkout</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
