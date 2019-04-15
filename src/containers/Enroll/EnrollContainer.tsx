import { EDictionaryNameList, IDictionaryScanableFilter, IDictionaryTypeFilter, IRootState } from '../../common';
import EnrollView from './EnrollView';
import Dictionary from '@mgutm-fcu/dictionary/Dictionary';
import * as React from 'react';
import { connect } from 'react-redux';
import { enrollStateSelector } from './selectors';
import { fullDictionaryList, shortDictionaryList } from './defaults';
import { IDictionary } from '@mgutm-fcu/dictionary';
import { checkPersonExist, checkPersonLogin, registerNewPerson } from './operations';
import { PersonInfo } from './models';
interface IProps {
	npId: number;
	dictionaries: Record<string, IDictionary>;
	checkPersonExist(data: PersonInfo): Promise<boolean>;
	registerNewPerson(login: string, password: string): Promise<number>;
	checkPersonLogin(login: string): void;
}

class EnrollContainer extends React.Component<IProps> {
	render() {
		return (
			<Dictionary
				version={2}
				url={'/dev-bin/priem_api.fcgi'}
				list={this.props.npId ? fullDictionaryList : shortDictionaryList}>
				<EnrollView />
			</Dictionary>
		);
	}
}

const mapStateToProps = (state: IRootState) => {
	const { npId } = enrollStateSelector(state);
	return {
		npId,
		dictionaries: state.dictionaries,
	};
};

const mapDispatchToProps = () => ({ registerNewPerson, checkPersonExist, checkPersonLogin });

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EnrollContainer);
