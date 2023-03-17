import { useAdminAuth } from '../customHooks/useAdminAuth';
const WithAdminAuth = (props) => {
	const isAdmin = useAdminAuth();
	return isAdmin && props.children;
};

export default WithAdminAuth;
