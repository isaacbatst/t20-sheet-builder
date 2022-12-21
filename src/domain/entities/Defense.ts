import {BuildingSheetContext} from './BuildingSheetContext';
import type {Context} from './Context';
import {ModifiersList} from './ModifierList';

export class Defense {
	readonly others = new ModifiersList(Defense.modifierRepeatedError);

	private static get base() {
		return 10;
	}

	private static get modifierRepeatedError() {
		return 'REPEATED_OTHER_DEFENSE_MODIFIER';
	}

	getTotal(dexterity: number, armorBonus: number, shieldBonus: number, context: Context = new BuildingSheetContext()) {
		const otherModifiersSum = this.others.getTotal(context);
		return Defense.base + dexterity + armorBonus + shieldBonus + otherModifiersSum;
	}
}
