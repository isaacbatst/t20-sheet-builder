import type {Attributes} from './Attributes';
import type {Dispatch, SheetInterface} from './SheetInterface';
import type {RaceName} from './Race/RaceName';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	applyAttributesModifiers(attributes: Attributes, dispatch: Dispatch): void;
	applyAbilities(sheet: SheetInterface): void;
};
