import type {Appliable, SheetInterface} from '../SheetInterface';
import {Spell} from './Spell';
import type {SpellCircle} from './SpellCircle';

export class SpellCost implements Appliable {
	constructor(readonly circle: SpellCircle) {}

	apply(sheet: SheetInterface): void {
		sheet.useMana(Spell.circleManaCost[this.circle]);
	}
}
