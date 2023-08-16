import {type ResistanceName} from '../Resistance/ResistanceName';
import {type SheetResistencesInterface} from './SheetResistencesInterface';
import {Resistance} from '../Resistance/Resistance';
import {type Attributes} from './Attributes';
import {type TranslatableName} from '..';

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
}
