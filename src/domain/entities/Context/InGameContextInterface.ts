import type {ContextInterface} from './ContextInterface';
import type {Location} from '../Sheet/SheetInterface';
import type {Character} from '../Character/Character';

export type InGameContextInterface = ContextInterface & {
	character: Character;
	getCurrentLocation(): Location;
};
