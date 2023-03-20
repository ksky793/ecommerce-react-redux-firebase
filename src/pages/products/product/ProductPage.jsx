import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

// redux actions
import { fetchProductByIdAsync } from '../../../redux/features/products/productSlice';
import { fetchCategoriesAsync } from '../../../redux/features/categories/categoriesSlice';
// components
import ProductCard from '../../../components/product/ProductCard';

const ProductPage = () => {
	const dispatch = useDispatch();
	const { selectedProduct, loading } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);
	const { productId } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		dispatch(fetchProductByIdAsync(productId));
		dispatch(fetchCategoriesAsync());
	}, [dispatch, productId]);

	// dodaje dodatkowo nazwe kategorii do obiektu produkt po id kategorii,
	useEffect(() => {
		if (selectedProduct && categories.length) {
			const category = categories.find(
				(cat) => cat.id === selectedProduct.categoryId
			);
			const productWithCategory = {
				...selectedProduct,
				category: category?.category,
			};
			setProduct(productWithCategory);
		}
	}, [selectedProduct, categories]);

	return (
		<div className='product-page p--70'>
			<div className='wrapper'>
				{loading ? (
					<FaSpinner className='spinner' />
				) : (
					<main className='product'>
						<ProductCard product={product} />
					</main>
				)}
			</div>
		</div>
	);
};

export default ProductPage;
