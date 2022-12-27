import type {Attributes} from './Attributes';
import type {RaceName} from './Race/RaceName';
import type {SheetBaseInterface} from './Sheet/SheetBaseInterface';
import type {Dispatch} from './Sheet/SheetInterface';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
};
