export const validateEmail = (input) => {
	const validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return validRegex.test(input);
};

const availableRules = {
	required(value) {
		return value ? '' : 'Required field';
	},
	min(value, rule) {
		return value.length >= rule.length ? '' : `Min. ${rule.length} characters`;
	},
	email(value) {
		return validateEmail(value) ? '' : 'Invalid email';
	},
};
export const isFormValid = (form) => {
	// przekształcanie obiektu na elementy w tablicy, aby móc wyliczyć długość
	const formLength = Object.keys(form).length;

	// wyświetlamy tylko te elementy, gdzie wartość valid jest true, a następnie zwracamy długość takiej tablicy
	const newFormLength = Object.values(form).filter(
		(val) => val.valid === true
	).length;

	// sprawdzenie czy wszystkie elementy valid w tablicy mają wartość true
	if (newFormLength === formLength) {
		return true;
	} else return false;
};

export const validate = (rules = [], value) => {
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule instanceof Object) {
			const errorMessage = availableRules[rule.rule](value, rule);
			if (errorMessage) return errorMessage;
		} else {
			const errorMessage = availableRules[rule](value);
			if (errorMessage) return errorMessage;
		}
	}
};
