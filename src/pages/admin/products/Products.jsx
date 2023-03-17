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
				<div className='table-container'>
					<table className='products'>
						<thead>
							<tr>
								<th>#</th>
								<th></th>
								<th>Product</th>
								<th>Category</th>
								<th>Price</th>
								<th>Quantity</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => {
								const category = categories.find(
									(cat) => cat.id === product.categoryId
								);
								return (
									<tr key={product.id}>
										<td>{++index}</td>
										<td>
											<img src={product.imageURL} alt={product.name} />
										</td>
										<td>{product.name}</td>
										<td>{category ? category.category : 'Unknown'}</td>
										<td>${product.price}</td>
										<td>{product.quantity}</td>
										<td>
											<AiOutlineClose
												className='ic'
												onClick={() => handleRemoveClick(product.id)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default Products;
