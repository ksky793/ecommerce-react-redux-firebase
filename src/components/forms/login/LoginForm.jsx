import { useState } from 'react';
import { signInWithGoogle } from '../../../firebase/utils';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { isFormValid, validate } from '../../../helpers/validation';
import {
	signInUser,
	signInGoogleUser,
} from '../../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// styles
import '../Forms.scss';
// assets
import googleLogo from '../../../assets/svgs/googleLogo.svg';
// components
import SpinningLoadingButton from '../../ui/LoadingButton/SpinningLoadingButton';
import Input from '../input/Input';
import AccountQuestion from '../accountQuestion/AccountQuestion';

const LoginForm = () => {
	const dispatch = useDispatch();

	const { error, loading, isLoggedIn } = useSelector((state) => state.auth);
	const [isValidForm, setIsValidForm] = useState(null);

	const [form, setForm] = useState({
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

	const handleSignInGoogle = () => {
		dispatch(signInGoogleUser({}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = isFormValid(form);
		if (isValid) {
			await dispatch(
				signInUser({ email: form.email.value, password: form.password.value })
			);
		} else {
			setIsValidForm(false);
		}
	};

	if (isLoggedIn) return <Navigate to='/' />;

	return (
		<div className='form-container wrapper'>
			<h1 className='form-header'>Sign In</h1>
			{error && <p className='invalid-feedback'>{error}</p>}
			{isValidForm === false && (
				<p className='invalid-feedback'>Fill in all fields correctly</p>
			)}
			<form className='form' onSubmit={handleSubmit}>
				<Input
					type='email'
					label='Email'
					onChange={(e) => changeHandler(e.target.value, 'email')}
					value={form.email.value}
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
				<SpinningLoadingButton loading={loading}>LOGIN</SpinningLoadingButton>
			</form>
			<Link to='/password-reset' className='form-text'>
				Forgot a password?
			</Link>
			<div className='sign-in-providers'>
				<p className='form-text'>Or Login With</p>
				<img
					className='google-logo'
					src={googleLogo}
					alt='Google Logo'
					onClick={handleSignInGoogle}
				/>
			</div>
			<AccountQuestion question={`Need an account?`} path='/registration'>
				Sign Up
			</AccountQuestion>
		</div>
	);
};

export default LoginForm;
