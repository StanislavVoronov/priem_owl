import { IDocument, IEnrollRegisterForm } from '$common';
import EnrollView from './EnrollView';
import Dictionary from '@mgutm-fcu/dictionary';
import * as React from 'react';
import { FormEvent } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { createPerson, registerNewPerson, sendVerificationCode } from './operations';
import { FULL_DICTIONARY_LIST, NEW_PERSON_STEPS, SHORT_DICTIONARY_LIST } from './constants';
import { EnrollForm, IEnrollForm } from './models';
import { IRootState } from '$store';

interface IDispatchToProps {
	registerNewPerson: (data: IEnrollRegisterForm) => Promise<void>;
	sendVerificationCode(email: string, mobPhone: string): Promise<void>;
	createPerson(confirmCode: string, data: IEnrollForm): Promise<void>;
}

type IProps = IDispatchToProps;

class EnrollContainer extends React.Component<IProps> {
	public componentDidCatch(error: any, info: any) {
		// You can also log the error to an error reporting service
	}
	handleStep = (step: EnrollForm) => () => {
		this.setState({
			activeStep: step,
		});
	};
	submit = (event: FormEvent<HTMLFormElement>) => {
		return void 0;
	};
	render() {
		const dictionaryList = SHORT_DICTIONARY_LIST;

		return (
			<Dictionary version={2} url={'/dev-bin/priem_api.fcgi'} list={dictionaryList}>
				<EnrollView steps={NEW_PERSON_STEPS} activeStep={0} />
			</Dictionary>
		);
	}
}

const mapStateToProps: MapStateToProps<{}, {}, IRootState> = state => {
	return {};
};

const mapDispatchToProps = {
	registerNewPerson,
	createPerson,
	sendVerificationCode,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollContainer);
