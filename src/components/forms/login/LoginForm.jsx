import React, { useState } from 'react';
import '../Forms.scss';
import googleLogo from '../../../assets/svgs/googleLogo.svg';
import SpinningLoadingButton from '../../ui/LoadingButton/SpinningLoadingButton';
import {
	signInWithGoogle,
	logInWithEmailAndPassword,
} from '../../../firebase/utils';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Input from '../input/Input';
import { isFormValid, validate } from '../../../helpers/validation';
import AccountQuestion from '../accountQuestion/AccountQuestion';

const LoginForm = (props) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		valid: null,
		message: '',
	});
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const isValid = isFormValid(form);
		if (isValid) {
			try {
				await logInWithEmailAndPassword(form.email.value, form.password.value);
				navigate('/');
			} catch (err) {
				console.log(err.message);
				setError({
					valid: false,
					message: err.message,
				});
				setLoading(false);
			}
		} else {
			setError({
				message: 'Please, fill in all fields correctly',
				valid: false,
			});
			setLoading(false);
		}
	};

	if (props.user) navigate('/');
	return (
		<div className='form-container wrapper'>
			<h1 className='form-header'>Sign In</h1>
			{!error.valid && <p className='invalid-feedback'>{error.message}</p>}
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
			{/* <p
				className='form-text'
				onClick={() => {
					sendPasswordReset(form.email.value);
				}}
			>
				Forgot a password?
			</p> */}
			<Link to='/password-reset' className='form-text'>
				Forgot a password?
			</Link>
			<div className='sign-in-providers'>
				<p className='form-text'>Or Login With</p>
				<img
					className='google-logo'
					src={googleLogo}
					alt='Google Logo'
					onClick={signInWithGoogle}
				/>
			</div>
			<AccountQuestion question={`Need an account?`} path='/registration'>
				Sign Up
			</AccountQuestion>
		</div>
	);
};

export default LoginForm;
