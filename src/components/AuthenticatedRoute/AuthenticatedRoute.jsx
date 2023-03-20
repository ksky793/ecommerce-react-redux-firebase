import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
const AuthenticatedRoute = (props) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}
	return props.children;
};

export default AuthenticatedRoute;
