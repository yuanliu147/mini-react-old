import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import hasOwnProperty from 'shared/hasOwnProperty';

import type { Key, Props, Ref, Type, ElementType } from 'shared/ReactTypes';

const RESERVED_PROPS = {
	key: true,
	ref: true,
	__self: true,
	__source: true
};

function hasValidKey(config: any) {
	return config.key !== undefined;
}

function hasValidRef(config: any) {
	return config.ref !== undefined;
}

function ReactElement(
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ElementType {
	return {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__tag: '我的'
	};
}

export function jsx(type: Type, config: any, maybeKey: any) {
	let propName: keyof any;

	const props: Props = {};

	let key = null;
	let ref = null;

	if (maybeKey !== undefined) {
		key = '' + maybeKey;
	}

	if (hasValidKey(config)) {
		key = '' + config.key;
	}

	if (hasValidRef(config)) {
		ref = config.ref;
	}

	// Remaining properties are added to a new props object
	for (propName in config) {
		if (
			hasOwnProperty.call(config, propName) &&
			!Object.prototype.hasOwnProperty.call(RESERVED_PROPS, propName)
		) {
			props[propName] = config[propName];
		}
	}

	// Resolve default props
	if (type && type.defaultProps) {
		const defaultProps = type.defaultProps;
		for (propName in defaultProps) {
			if (props[propName] === undefined) {
				props[propName] = defaultProps[propName];
			}
		}
	}

	return ReactElement(type, key, ref, props);
}

export const jsxDEV = jsx;
