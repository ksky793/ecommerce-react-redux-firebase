import './Input.scss';

const InputFile = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>
			<input
				className={`form-control ${props.showError && 'is-invalid'}`}
				type={props.type}
				id={props.name}
				ref={props.reference}
				onChange={props.onChange}
			/>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};
const InputSelect = (props) => {
	return (
		<div className='form-group'>
			<label>{props.label}</label>

			<select
				className={`form-select ${props.showError && 'is-invalid'}`}
				value={props.name}
				onChange={props.onChange}
			>
				<option value='' disabled hidden>
					Select an option
				</option>
				{props.options.map((option) => (
					<option value={option.id} key={option.id}>
						{option.category}
					</option>
				))}
			</select>
			<div className='invalid-feedback'>{props.error}</div>
		</div>
	);
};
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
		case 'file':
			return <InputFile {...props} />;
		case 'select':
			return <InputSelect {...props} />;
		default:
			return <InputText {...props} />;
	}
};

export default Input;
