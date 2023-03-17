import { Outlet } from 'react-router-dom';

import '../../components/ui/buttons/Buttons.scss';
import './Admin.scss';

import { Link } from 'react-router-dom';

const Admin = () => {
	return (
		<div className='admin-page p--70 '>
			<div className='admin wrapper'>
				<div className='admin__buttons'>
					<Link to='products/add-product' className='btn btn--admin m-b--20'>
						Add Product
					</Link>
					<Link to='products' className='btn btn--admin m-b--20'>
						Fetch Products
					</Link>
					<Link to='/add-category' className='btn btn--admin m-b--20'>
						Add Category
					</Link>
				</div>
				<div className='admin__body'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Admin;
