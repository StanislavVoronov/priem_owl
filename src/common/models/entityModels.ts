import { Gender } from '$common';

export interface IPerson {
	lastName: string;
	firstName: string;
	middleName: string;
	birthday: string;
	gender: Gender;
}
