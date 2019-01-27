import { Space } from './models';
export const composeStyles = (...rest: any) => Object.assign({}, ...rest);

type Spaces = [Space, Space] | Space;
export const makeSpace = (spaces: Spaces): Object => {
	let styles = {};
	const spaceList = Array.isArray(spaces) ? spaces : [spaces];
	if (spaceList.includes('v-little')) {
		styles = composeStyles({ marginTop: 6, marginBottom: 3 }, styles);
	}
	if (spaceList.includes('v-small')) {
		styles = composeStyles({ marginTop: 12, marginBottom: 6 }, styles);
	}
	if (spaceList.includes('v-middle')) {
		styles = composeStyles({ marginTop: 16, marginBottom: 12 }, styles);
	}
	if (spaceList.includes('v-big')) {
		styles = composeStyles({ marginTop: 24, marginBottom: 16 }, styles);
	}
	if (spaceList.includes('v-large')) {
		styles = composeStyles({ marginTop: 30, marginBottom: 20 }, styles);
	}
	if (spaceList.includes('h-little')) {
		styles = composeStyles({ marginLeft: 0, marginRight: 5 }, styles);
	}
	if (spaceList.includes('h-small')) {
		styles = composeStyles({ marginLeft: 5, marginRight: 5 }, styles);
	}
	if (spaceList.includes('h-middle')) {
		styles = composeStyles({ marginLeft: 10, marginRight: 10 }, styles);
	}
	if (spaceList.includes('h-big')) {
		styles = composeStyles({ marginLeft: 20, marginRight: 20 }, styles);
	}
	if (spaceList.includes('h-large')) {
		styles = composeStyles({ marginLeft: 30, marginRight: 30 }, styles);
	}
	return styles;
};
