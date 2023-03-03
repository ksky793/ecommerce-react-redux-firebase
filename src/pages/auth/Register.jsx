import { useState } from 'react';
import { validate, isFormValid } from '../../helpers/validation';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/features/auth/authSlice';

// components
import Input from '../../components/forms/input/Input';
import SpinningLoadingButton from '../../components/ui/LoadingButton/SpinningLoadingButton';
import AccountQuestion from '../../components/forms/accountQuestion/AccountQuestion';

const RegisterPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

	const [form, setForm] = useState({
		firstName: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},
		lastName: {
			value: '',
			error: '',
			showError: '',
			valid: null,
			rules: ['required'],
		},
		email: {
			value: '',
			error: '',
			showError: false,
			valid: false,
			rules: ['required', 'email'],
		},
		password: {
			value: '',
			error: '',
			showError: false,
			valid: false,
			rules: ['required', { rule: 'min', length: 6 }],
		},
	});

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = isFormValid(form);
		if (isValid) {
			const fullName = `${form.firstName.value} ${form.lastName.value}`;

			await dispatch(
				signUpUser({
					fullName: fullName,
					email: form.email.value,
					password: form.password.value,
				})
			);
			if (error === false) navigate('/login');
		}
	};

	if (isLoggedIn) return <Navigate to='/' />;
	return (
		<div className='form-container wrapper'>
			<h1 className='form-header'>Sign Up</h1>
			{error && <p className='invalid-feedback'>{error}</p>}
			<form onSubmit={handleSubmit} className='form'>
				<Input
					type='text'
					label='First Name'
					value={form.firstName.value}
					onChange={(e) => changeHandler(e.target.value, 'firstName')}
					showError={form.firstName.showError}
					error={form.firstName.error}
				/>
				<Input
					type='text'
					label='Last Name'
					value={form.lastName.value}
					onChange={(e) => changeHandler(e.target.value, 'lastName')}
					showError={form.lastName.showError}
					error={form.lastName.error}
				/>
				<Input
					type='email'
					label='Email'
					value={form.email.value}
					onChange={(e) => changeHandler(e.target.value, 'email')}
					showError={form.email.showError}
					error={form.email.error}
				/>
				<Input
					type='password'
					label='Password'
					value={form.password.value}
					onChange={(e) => changeHandler(e.target.value, 'password')}
					showError={form.password.showError}
					error={form.password.error}
				/>
				<SpinningLoadingButton loading={loading}>
					Register
				</SpinningLoadingButton>
			</form>
			<AccountQuestion question={`Have an account?`} path='/login'>
				Sign In
			</AccountQuestion>
		</div>
	);
};

export default RegisterPage;
