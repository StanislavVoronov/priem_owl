export const inValidateDataForm = (data: Record<string, any>): boolean => {
	return Object.values(data).some(
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
