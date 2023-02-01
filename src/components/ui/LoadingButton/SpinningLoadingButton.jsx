import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function SpinningLoadingButton({ loading, children }) {
	return (
		<button className='submit-button'>
			{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : children}
		</button>
	);
}

export default SpinningLoadingButton;
