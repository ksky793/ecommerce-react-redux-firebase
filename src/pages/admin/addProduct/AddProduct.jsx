import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// helpers
import { isFormValid, validate } from '../../../helpers/validation';
// components
import SpinningLoadingButton from '../../../components/ui/buttons/LoadingButton/SpinningLoadingButton';
import Input from '../../../components/forms/input/Input';
// actions
import { addProductAsync } from '../../../redux/features/products/productSlice';
import { fetchCategoriesAsync } from '../../../redux/features/categories/categoriesSlice';

const AddProduct = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.products);

	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	const [form, setForm] = useState({
		name: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},

		price: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},
		quantity: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},
		description: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},
		category: {
			value: categories.length > 0 ? categories[0].id : '',
			error: '',
			showError: '',
			valid: true,
			rules: ['required'],
		},
	});
	const [file, setFile] = useState('');

	const changeHandler = (value, fieldName) => {
		const error = validate(form[fieldName].rules, value);
		setForm({
			...form,
			[fieldName]: {
				...form[fieldName],
				error: error,
				showError: error ? true : false,
				valid: error ? false : true,
				value: value,
			},
		});
	};
	const handleInputFile = (e) => {
		setFile(e.target.files[0]);
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const isValid = isFormValid(form);
		if (isValid) {
			dispatch(
				addProductAsync({
					name: form.name.value,
					price: form.price.value,
					quantity: form.quantity.value,
					description: form.description.value,
					image: file,
					categoryId: form.category.value,
				})
			);
		}
	};

	if (error === false) navigate('/admin/products');

	return (
		<div className='form-container '>
			{/* {error && <p className='invalid-feedback'>{error}</p>} */}
			<form className='form' onSubmit={handleOnSubmit}>
				<Input
					type='text'
					label='Name'
					value={form.name.value}
					onChange={(e) => changeHandler(e.target.value, 'name')}
					showError={form.name.showError}
					error={form.name.error}
				/>
				<Input
					type='file'
					label='Image'
					value={file}
					onChange={handleInputFile}
				/>
				<Input
					type='select'
					name={form.category.value}
					options={categories}
					label='Category'
					onChange={(e) => changeHandler(e.target.value, 'category')}
					error={form.category.error}
					showError={form.category.showError}
				/>
				<Input
					type='text'
					label='Quantity'
					value={form.quantity.value}
					onChange={(e) => changeHandler(e.target.value, 'quantity')}
					showError={form.quantity.showError}
					error={form.quantity.error}
				/>
				<Input
					type='text'
					label='Price'
					value={form.price.value}
					onChange={(e) => changeHandler(e.target.value, 'price')}
					showError={form.price.showError}
					error={form.price.error}
				/>
				<Input
					type='textarea'
					label='Description'
					value={form.description.value}
					onChange={(e) => changeHandler(e.target.value, 'description')}
					showError={form.description.showError}
					error={form.description.error}
				/>
				<SpinningLoadingButton loading={loading}>
					ADD PRODUCT
				</SpinningLoadingButton>
			</form>
		</div>
	);
};

export default AddProduct;
