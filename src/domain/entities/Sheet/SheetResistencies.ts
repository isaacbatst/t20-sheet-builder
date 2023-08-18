import {type ContextInterface, type TranslatableName} from '..';
import {Resistance, type SerializedResistance} from '../Resistance/Resistance';
import {type ResistanceName} from '../Resistance/ResistanceName';
import {type Attributes} from './Attributes';
import {type SheetInterface} from './SheetInterface';
import {type SerializedSheetResistencies, type SheetResistencesInterface} from './SheetResistencesInterface';

export type SheetResistenciesType = Record<ResistanceName, Resistance>;

export class SheetResistences implements SheetResistencesInterface {
	private resistances: Partial<SheetResistenciesType> = {};

	addResistance(resistance: ResistanceName, value: number, source: TranslatableName): void {
		this.resistances[resistance] = new Resistance(resistance, value, source);
	}

	getTotal(resistance: ResistanceName, attributes: Attributes): number {
		const foundResistance = this.resistances[resistance];
		if (foundResistance) {
			return foundResistance.getTotal(attributes);
		}

		return 0;
	}

	getResistances() {
		return this.resistances;
	}

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetResistencies {
		const serializedResistencies: Partial<Record<ResistanceName, SerializedResistance>> = {};

		Object.values(this.resistances).forEach(resistance => {
			serializedResistencies[resistance.resisted] = resistance.serialize(sheet, context);
		});

		return {
			resistances: serializedResistencies,
		};
	}
}
