import type {ContextInterface} from './ContextInterface';
import type {Location} from '../Sheet/SheetInterface';

export type InGameContextInterface = ContextInterface & {
	getCurrentLocation(): Location;
};
