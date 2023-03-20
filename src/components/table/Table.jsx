import { AiOutlineClose } from 'react-icons/ai';

const Table = ({ categories, products, onClick }) => {
	return (
		<div className='table-container'>
			<table className='products'>
				<thead>
					<tr>
						<th>#</th>
						<th></th>
						<th>Product</th>
						<th>Category</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => {
						const category = categories.find(
							(cat) => cat.id === product.categoryId
						);
						return (
							<tr key={index}>
								<td>{++index}</td>
								<td>
									<img src={product.imageURL} alt={product.name} />
								</td>
								<td>{product.name}</td>
								<td>{category ? category.category : 'Unknown'}</td>
								<td>${product.price}</td>
								<td>{product.quantity}</td>
								<td>$ {(product.price * product.quantity).toFixed(2)}</td>
								<td>
									<AiOutlineClose
										className='ic'
										onClick={() => onClick(product.id)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
