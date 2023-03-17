import { useState } from 'react';
import Input from '../../components/forms/input/Input';
import SpinningLoadingButton from '../../components/ui/buttons/LoadingButton/SpinningLoadingButton';
import { validateEmail } from '../../helpers/validation';
import { sendPasswordReset } from '../../firebase/utils';
import { useNavigate } from 'react-router-dom';
const ResetPasswordPage = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState({
		valid: null,
		message: '',
	});

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const isValid = validateEmail(email);
		if (isValid) {
			try {
				await sendPasswordReset(email);
				navigate('/login');
			} catch (err) {
				setError({
					valid: false,
					message: err.message,
				});
			}
		} else {
			setError({
				valid: false,
				message: 'Please, fill in email field correctly',
			});
		}
		setLoading(false);
	};
	return (
		<div className='form-container wrapper'>
			<h1 className='form-header'>Password Reset</h1>
			{!error.valid && <p className='invalid-feedback'>{error.message}</p>}
			<form className='form' onSubmit={handleSubmit}>
				<Input
					type='email'
					label='Email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<SpinningLoadingButton loading={loading}>
					Reset Password
				</SpinningLoadingButton>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
