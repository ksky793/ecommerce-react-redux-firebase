import { AiOutlineClose } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// service
import { fetchCategoriesAsync } from '../../../redux/features/categories/categoriesSlice';
import {
	fetchProductsAsync,
	removeProductAsync,
} from '../../../redux/features/products/productSlice';
// styles
import './Products.scss';
import Table from '../../../components/table/Table';

const Products = () => {
	const dispatch = useDispatch();
	const { products, loading } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchProductsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	const handleRemoveClick = (id) => {
		dispatch(removeProductAsync(id));
	};

	return (
		<>
			{loading ? (
				<FaSpinner className='spinner' />
			) : (
				<Table
					products={products}
					categories={categories}
					handleRemoveClick={handleRemoveClick}
				/>
			)}
		</>
	);
};

export default Products;
