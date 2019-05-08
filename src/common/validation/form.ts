import { Gender, IDocument, IRegisterForm } from '$common';

export const validateDataForm = (data: Record<string, any>): boolean => {
	return !Object.values(data).some(
		(value): boolean => {
			let invalidData = false;
			switch (typeof value) {
				case 'string': {
					invalidData = value.trim().length === 0;
					break;
				}
				case 'object': {
					invalidData = value !== null ? Object.keys(value).length === 0 : true;
					break;
				}
				default: {
					invalidData = value === undefined;
				}
			}

			return invalidData;
		},
	);
};

export const validateDocument = (document: IDocument): boolean => {
	if (!document.docFile || !document.docType) {
		return false;
	}
	if (document.docType && (document.docType.id === 1 || document.docType.id === 2) && !document.docSubType) {
		return false;
	}
	if (document.docType && document.docType.need_info) {
		return (
			(document.docIssieBy &&
				document.docIssieBy.length > 0 &&
				(document.docDate && document.docDate.length > 0) &&
				(document.docType && document.docType.has_number && document.docNumber && document.docNumber.length > 0) &&
				(document.docSeries && document.docSeries.length > 0)) ||
			false
		);
	}

	return true;
};

export const validateRegistrationForm = (fields: IRegisterForm): boolean => {
	if (fields.gender === Gender.None) {
		return false;
	}

	if (fields.login.length > 0 && fields.login.length < 8) {
		return false;
	}

	if (fields.password.length > 0 && fields.password.length < 7) {
		return false;
	}
	if (fields.password.length > 0 && fields.repeatPassword.length > 0 && fields.password !== fields.repeatPassword) {
		return false;
	}

	return validateDataForm(fields);
};
