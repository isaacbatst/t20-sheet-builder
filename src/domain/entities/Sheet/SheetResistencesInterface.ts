import {type TranslatableName} from '..';
import {type ResistanceName} from '../Resistance/ResistanceName';
import {type Attributes} from './Attributes';
import {type SheetResistenciesType} from './SheetResistencies';

export type SheetResistencesInterface = {
	addResistance(resistance: ResistanceName, value: number, source: TranslatableName): void;
	getTotal(resistance: ResistanceName, attributes: Attributes): number;
	getResistances(): Partial<SheetResistenciesType>;
};
