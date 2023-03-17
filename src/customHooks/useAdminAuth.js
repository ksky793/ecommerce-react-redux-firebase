import { useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const checkUserIsAdmin = (user) => {
	if (user?.role === 'admin') return true;
	return false;
};

export const useAdminAuth = () => {
	const navigate = useNavigate();
	const userInfo = useSelector(selectUserInfo) || {};
	useEffect(() => {
		if (!checkUserIsAdmin(userInfo)) navigate('/');
	}, [userInfo]);
	return userInfo;
};
