import type {Attack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/DiceRoll';
import {type ContextualModifiersListTotalCalculator} from '../Modifier';
import {ContextualModifiersList} from '../Modifier/ContextualModifier/ContextualModifierList';
import {type RandomInterface} from '../Random';
import {type SheetInterface} from '../Sheet/SheetInterface';

type Modifiers = {
	contextual: ContextualModifiersList;
};

type AttackResult = {
	rollResult: RollResult;
	modifiers: Modifiers;
	total: number;
};

export class CharacterAttack {
	constructor(
		readonly attack: Attack,
		readonly modifiers: Modifiers = {
			contextual: new ContextualModifiersList(),
		},
	) {}

	roll(random: RandomInterface, totalCalculator: ContextualModifiersListTotalCalculator): AttackResult {
		const rollResult = this.attack.roll(random);
		return {
			rollResult,
			modifiers: this.modifiers,
			total: rollResult.total + this.modifiers.contextual.getTotal(totalCalculator),
		};
	}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			attack: this.attack.serialize(),
			modifiers: this.modifiers.contextual.serialize(sheet, context),
		};
	}
}
