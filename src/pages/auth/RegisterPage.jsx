import Input from '../../components/forms/input/Input';
import SpinningLoadingButton from '../../components/ui/LoadingButton/SpinningLoadingButton';
import { useState } from 'react';
import { validate } from '../../helpers/validation';
import AccountQuestion from '../../components/forms/accountQuestion/AccountQuestion';
import { isFormValid } from '../../helpers/validation';
import { registerWithEmailAndPassword } from '../../firebase/utils';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState({
		valid: null,
		message: '',
	});
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
		setLoading(true);
		const isValid = isFormValid(form);

		if (isValid) {
			try {
				const fullName = `${form.firstName.value} ${form.lastName.value}`;
				await registerWithEmailAndPassword(
					fullName,
					form.email.value,
					form.password.value
				);
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
			setError({ message: 'Wypełnij wszystkie pola poprawnie', valid: false });
			setLoading(false);
		}
	};
	return (
		<div className='form-container wrapper'>
			<h1 className='form-header'>Sign Up</h1>
			{!error.valid && <p className='invalid-feedback'>{error.message}</p>}
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
