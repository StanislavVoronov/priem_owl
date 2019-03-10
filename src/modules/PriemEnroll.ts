class PriemEnroll {
	public static host = 'https://monitoring.mgutm.ru/dev-bin';
	public static path = '/priem_enroll_verify';
	public static post = <T>(api: string, payload?: any): Promise<T> => {
		const body = new FormData();
		body.append('api', api);
		body.append('values', JSON.stringify(payload));
		return fetch(`${PriemEnroll.host}${PriemEnroll.path}`, {
			method: 'POST',
			credentials: 'include',
			body,
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				return Promise.resolve(data);
			});
	};
}

export default PriemEnroll;
