import type {Attributes} from './Attributes';
import type {BuildingSheet} from './BuildingSheet';
import type {RaceName} from './Race/RaceName';
import type {Dispatch} from './SheetInterface';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	applyAttributesModifiers(attributes: Attributes, dispatch: Dispatch): void;
	applyAbilities(sheet: BuildingSheet): void;
};
