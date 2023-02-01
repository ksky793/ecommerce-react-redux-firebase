import { Link } from 'react-router-dom';

// komponent który przekierowuje do strony logowania lub rejestracji w zaleznosci czy uzytkownik posiada juz konto czy nie i w jakim formularzu sie znajdujes
const AccountQuestion = (props) => {
	return (
		<p className='form-text' style={{ textAlign: 'center' }}>
			{props.question}
			<span>
				<Link to={props.path}> {props.children} </Link>
			</span>
		</p>
	);
};

export default AccountQuestion;
