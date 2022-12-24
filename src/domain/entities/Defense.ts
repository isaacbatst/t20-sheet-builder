import {OutGameContext} from './OutOfGameContext';
import type {Context} from './Context';
import {ModifiersList} from './ModifierList';

export class Defense {
	readonly others = new ModifiersList();

	private static get base() {
		return 10;
	}

	getTotal(dexterity: number, armorBonus: number, shieldBonus: number, context: Context = new OutGameContext()) {
		const otherModifiersSum = this.others.getTotal(context);
		return Defense.base + dexterity + armorBonus + shieldBonus + otherModifiersSum;
	}
}
