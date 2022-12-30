import type {Attributes} from '../Sheet/Attributes';
import type {RaceName} from './RaceName';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
};
