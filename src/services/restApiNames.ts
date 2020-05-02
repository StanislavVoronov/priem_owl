export enum PRIEM_API_NAMES {
	FindPerson = 'findNPUID',
	UpdateAddress = 'uDATA_PLACE_INFO',
	CheckUniqueLogin = 'testUniqueEnroll',
	AddEnroll = 'addEnroll',
	AddDocuments = 'iDATA_DOCUMENTS',
	UpdatePhone = 'uDATA_PHONES',
	PriemFilials = 'ADM_FILIAL',
	FetchPriemInstitutes = 'ADM_INST',
	FetchPriemEducationLevels = 'ADM_EDU_LVL',
	FetchPriemDirections = 'ADM_DIRECTION',
	FetchPriemProfiles = 'ADM_PROF',
	FetchPriemPayForms = 'ADM_FIN',
	FetchPriemEducationForms = 'ADM_FOE',
	FetchAdmTypes = 'ADM_TYPES',

	FetchPriemGroups = 'ADM_ID',
	AddPriemApplication = 'iDATA_APPLICATIONS',
	PriemLogout = 'enrollLogout',
	UpdateCoolness = 'updDATA_COOLNESS',
	UpdateLogin = 'DATA_NP_AUTH.LOGIN',
}

export enum ENROLL_API_NAMES {
	VerNewNp = 'vernewnp',
	VerNp = 'vernp',
	SetNp = 'setnp',
	SetNewNp = 'setnewnp',
	VerPersonContacts = 'npverdata',
}
