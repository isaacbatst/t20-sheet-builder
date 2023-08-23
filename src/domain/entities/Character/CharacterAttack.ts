import type {Attack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/RollResult';
import {type ContextualModifiersListTotalCalculator} from '../Modifier';
import {Modifiers} from '../Modifier/Modifiers';
import {type RandomInterface} from '../Random';
import {type Attributes} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';

type AttackResult = {
	rollResult: RollResult;
	modifiers: Modifiers;
	total: number;
};

export class CharacterAttack {
	constructor(
		readonly attack: Attack,
		readonly modifiers: Modifiers = new Modifiers(),
	) {}

	roll(random: RandomInterface, totalCalculator: ContextualModifiersListTotalCalculator): AttackResult {
		const rollResult = this.attack.rollTest(random);
		return {
			rollResult,
			modifiers: this.modifiers,
			total: rollResult.total + this.getModifiersTotal(totalCalculator),
		};
	}

	getModifiersMaxTotal(attributes: Attributes) {
		return this.modifiers.contextual.getMaxTotal(attributes);
	}

	getModifiersTotal(totalCalculator: ContextualModifiersListTotalCalculator) {
		return this.modifiers.contextual.getTotal(totalCalculator);
	}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			attack: this.attack.serialize(),
			modifiers: this.modifiers.contextual.serialize(sheet, context),
		};
	}
}
