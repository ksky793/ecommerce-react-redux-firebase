import { FaSpinner } from 'react-icons/fa';
function SpinningLoadingButton({ loading, children }) {
	return (
		<button type='submit' className='btn btn--submit w--100'>
			{loading ? <FaSpinner className='spinner' /> : children}
		</button>
	);
}

export default SpinningLoadingButton;
