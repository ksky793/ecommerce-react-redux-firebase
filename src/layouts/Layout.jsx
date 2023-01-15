const Layout = (props) => {
	return (
		<div>
			<div>{props.navbar}</div>
			<div>{props.header}</div>
			<div>{props.content}</div>
			<div>{props.footer}</div>
		</div>
	);
};

export default Layout;
