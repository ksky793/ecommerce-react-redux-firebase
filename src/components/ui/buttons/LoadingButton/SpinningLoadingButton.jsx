import { FaSpinner } from 'react-icons/fa';
function SpinningLoadingButton({ loading, children }) {
	return (
		<button type='submit' className='btn btn--submit '>
			{loading ? <FaSpinner className='spinner' /> : children}
		</button>
	);
}

export default SpinningLoadingButton;
