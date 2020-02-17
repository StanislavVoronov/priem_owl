import * as React from 'react';
import Logo from '$assets/mgutm.png';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import DescriptionIcon from '@material-ui/icons/Description';
import CategoryIcon from '@material-ui/icons/Category';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import GroupIcon from '@material-ui/icons/Group';
import classes from './EnrollHeader.module.css';

class EnrollHeader extends React.PureComponent {
	onNavIconClick = (href: string) => () => {
		window.open(href, '_blank');
	};
	onLogoClick = () => {
		window.open('http://mgutm.ru', '_blank');
	};

	render() {
		return (
			<div className={classes.container}>
				<img className={classes.logo} onClick={this.onLogoClick} src={Logo} />
				<BottomNavigation showLabels className={classes.nav}>
					<BottomNavigationAction
						className={classes.nav}
						label={
							<a className={classes.link} href="http://mgutm.ru/entrant_2012/aktualnii_dokumenti.php" target="_blank">
								Правила приема
							</a>
						}
						icon={
							<ImportContactsIcon
								onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/aktualnii_dokumenti.php')}
								fontSize="large"
								color="primary"
							/>
						}
					/>
					<BottomNavigationAction
						className={classes.nav}
						label={
							<a className={classes.link} href="http://mgutm.ru/entrant/doc.php" target="_blank">
								Необходимые документы
							</a>
						}
						icon={
							<DescriptionIcon
								fontSize="large"
								color="primary"
								onClick={this.onNavIconClick('http://mgutm.ru/entrant/doc.php')}
							/>
						}
					/>
					<BottomNavigationAction
						className={classes.nav}
						label={
							<a
								className={classes.link}
								onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/naprovleniya_podgotovki.php')}
								href="http://mgutm.ru/entrant_2012/naprovleniya_podgotovki.php"
								target="_blank">
								Направления подготовки
							</a>
						}
						icon={<CategoryIcon fontSize="large" color="primary" />}
					/>
					<BottomNavigationAction
						label={
							<a
								className={classes.link}
								onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/plan-kalendar-priema.php')}
								href="http://mgutm.ru/entrant_2012/plan-kalendar-priema.php"
								target="_blank">
								Календарь приема
							</a>
						}
						icon={<DateRangeIcon fontSize="large" color="primary" />}
					/>
					<BottomNavigationAction
						label={
							<a className={classes.link} href="http://mgutm.ru/exams/" target="_blank">
								Вступительные испытания
							</a>
						}
						onClick={this.onNavIconClick('http://mgutm.ru/exams/')}
						icon={<SchoolIcon fontSize="large" color="primary" />}
					/>
					<BottomNavigationAction
						label={
							<a className={classes.link} href="http://mgutm.ru/entrant_2012/plan.php" target="_blank">
								План приема
							</a>
						}
						onClick={this.onNavIconClick('http://mgutm.ru/entrant_2012/plan.php')}
						icon={<GroupIcon fontSize="large" color="primary" />}
					/>
				</BottomNavigation>
			</div>
		);
	}
}

export default EnrollHeader;
