import {BuildingSheetContext} from './BuildingSheetContext';
import type {Context} from './Context';
import {ModifierOthers} from './ModifierOthers';

export class Defense {
	readonly modifierOthers = new ModifierOthers(Defense.modifierRepeatedError);

	private static get base() {
		return 10;
	}

	private static get modifierRepeatedError() {
		return 'REPEATED_OTHER_DEFENSE_MODIFIER';
	}

	getTotal(dexterity: number, armorBonus: number, shieldBonus: number, context: Context = new BuildingSheetContext()) {
		const otherModifiersSum = this.modifierOthers.getTotal(context);
		return Defense.base + dexterity + armorBonus + shieldBonus + otherModifiersSum;
	}
}
