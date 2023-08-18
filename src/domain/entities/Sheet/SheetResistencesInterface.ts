import {type ContextInterface} from '../Context';
import {type SerializedResistance} from '../Resistance/Resistance';
import {type ResistanceName} from '../Resistance/ResistanceName';
import {type TranslatableName} from '../Translator';
import {type Attributes} from './Attributes';
import {type SheetInterface} from './SheetInterface';
import {type SheetResistenciesType} from './SheetResistencies';

export type SheetResistencesInterface = {
	addResistance(resistance: ResistanceName, value: number, source: TranslatableName): void;
	getTotal(resistance: ResistanceName, attributes: Attributes): number;
	getResistances(): Partial<SheetResistenciesType>;
	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetResistencies;
};

export type SerializedSheetResistencies = {
	resistances: Partial<Record<ResistanceName, SerializedResistance>>;
};
