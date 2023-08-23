import type {Attack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/RollResult';
import {type FixedModifier, type ContextualModifiersListTotalCalculator} from '../Modifier';
import {Modifiers, type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators} from '../Modifier/Modifiers';
import {type RandomInterface} from '../Random';
import {type Attributes} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';

type AttackResult = {
	damage: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
	};
	test: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
	};
};

type CharacterAttackModifiers = {
	test: Modifiers;
	damage: Modifiers;
};

export class CharacterAttack {
	readonly modifiers: CharacterAttackModifiers;
	constructor(
		readonly attack: Attack,
		private skillModifierIndex: number,
		modifiers: Partial<CharacterAttackModifiers> = {},
	) {
		modifiers.test = modifiers.test ?? new Modifiers();
		modifiers.damage = modifiers.damage ?? new Modifiers();
		this.modifiers = modifiers as CharacterAttackModifiers;
	}

	changeTestSkillModifier(modifier: FixedModifier) {
		this.modifiers.test.fixed.remove(this.skillModifierIndex);
		this.skillModifierIndex = this.modifiers.test.fixed.add(modifier);
	}

	roll(random: RandomInterface, calculators: ModifiersTotalCalculators): AttackResult {
		const {damage, test} = this.attack.roll(random);
		return {
			damage: {
				rollResult: damage,
				modifiers: this.modifiers.damage,
				total: damage.total + this.getDamageModifiersTotal(calculators),
			},
			test: {
				rollResult: test,
				modifiers: this.modifiers.test,
				total: test.total + this.getTestModifiersTotal(calculators),
			},
		};
	}

	getTestModifiersMaxTotal(attributes: Attributes, calculators: ModifiersMaxTotalCalculators) {
		return this.modifiers.test.getMaxTotal(attributes, calculators);
	}

	getTestModifiersTotal(calculators: ModifiersTotalCalculators) {
		return this.modifiers.test.getTotal(calculators);
	}

	getDamageModifiersMaxTotal(attributes: Attributes, calculators: ModifiersMaxTotalCalculators) {
		return this.modifiers.damage.getMaxTotal(attributes, calculators);
	}

	getDamageModifiersTotal(calculators: ModifiersTotalCalculators) {
		return this.modifiers.damage.getTotal(calculators);
	}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			attack: this.attack.serialize(),
			modifiers: {
				test: this.modifiers.test.serialize(sheet, context),
				damage: this.modifiers.damage.serialize(sheet, context),
			},
		};
	}
}
