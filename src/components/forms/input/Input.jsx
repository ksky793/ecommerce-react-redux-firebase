import './Input.scss';

const InputTextArea = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<textarea
				type='text'
				className='form-control'
				value={props.value}
				onChange={props.onChange}
			></textarea>
		</div>
	);
};

const InputText = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<input
				type={props.type}
				className={`form-control`}
				value={props.value}
				onChange={props.onChange}
				style={{ border: props.showError && '1px solid red' }}
			/>
			{props.showError && <p className='invalid-feedback'>{props.error}</p>}
		</div>
	);
};

const Input = (props) => {
	switch (props.type) {
		case 'textarea':
			return <InputTextArea {...props} />;
		case 'text':
			return <InputText {...props} />;
		case 'password':
			return <InputText {...props} />;
		case 'email':
			return <InputText {...props} />;
	}
};

export default Input;
