import {type Location} from '../Sheet';

export type ContextInterface = {
	activateContextualModifiers: boolean;
	getCurrentLocation(): Location | undefined;
};
