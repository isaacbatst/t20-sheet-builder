import type {Attributes} from './Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {RaceName} from './Race/RaceName';
import type {Dispatch} from './Sheet/SheetInterface';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void;
};
