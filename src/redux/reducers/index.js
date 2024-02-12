import { combineReducers } from 'redux';

import themeReducer from './themeReducers';
import userReducer from './userReducer';
import branchReducer from './branchReducer';
import enquiryReducer from './enquiryReducer';
import globalReducer from './globalReducer';
import studentReducer from "./studentReducer";
import toasterReducer from './toasterReducer';
import courseReducer from './courseReducer';
import platformReducer from './platformReducer';
import qualificationReducer from './qualificationReducer';
import interGroupReducer from './interGroupReducer';
import courseTenureReducer from './courseTenureReducer';
import casteReducer from './casteReducer';
import studentDetailsReducer from './studentDetailsReducer';
import loadingOverlayReducer from './loadingOverlayReducer';

export default combineReducers({
	themeReducer,
	userReducer,
	branchReducer,
	enquiryReducer,
	globalReducer,
	studentReducer,
	toasterReducer,
	courseReducer,
	platformReducer,
	qualificationReducer,
	interGroupReducer,
	courseTenureReducer,
	casteReducer,
	studentDetailsReducer,
	loadingOverlayReducer
});
