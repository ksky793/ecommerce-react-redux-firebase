import { FaSpinner } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux actions
import { fetchProductsAsync } from '../../redux/features/products/productSlice';
import { fetchCategoriesAsync } from '../../redux/features/categories/categoriesSlice';
// components
import ProductCard from '../../components/product/ProductCard';
import { Link } from 'react-router-dom';

const Products = () => {
	const dispatch = useDispatch();
	const { products, loading } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchProductsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	return (
		<main className='products p--70'>
			<div className='wrapper'>
				{loading ? (
					<FaSpinner className='spinner' />
				) : (
					products.map((p) => {
						const category = categories.find((cat) => cat.id === p.categoryId);
						const newP = { ...p, category: category?.category };
						return (
							<Link to={`/products/${p?.id}`}>
								<ProductCard
									product={newP}
									key={p.id}
									category={category}
									isOnProductsPage
								/>
							</Link>
						);
					})
				)}
			</div>
		</main>
	);
};

export default Products;
