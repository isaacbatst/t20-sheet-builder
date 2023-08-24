import type {Attack, SerializedAttack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/RollResult';
import {type FixedModifier} from '../Modifier';
import {type Modifiers, type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators, type SerializedModifiers} from '../Modifier/Modifiers';
import {type RandomInterface} from '../Random';
import {type Attributes} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {CharacterAttackModifiers} from './CharactterAttackModifiers';

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

export type SerializedCharacterAttack = {
	attack: SerializedAttack;
	modifiers: {
		test: SerializedModifiers;
		damage: SerializedModifiers;
	};
};

type CharacterAttackConstructorParams = {
	attack: Attack;
	modifiers?: Partial<CharacterAttackModifiers>;
	testSkillModifierIndex: number;
	damageAttributeModifierIndex?: number;
};

export class CharacterAttack {
	readonly modifiers: CharacterAttackModifiers;
	readonly attack: Attack;
	private readonly damageAttributeModifierIndex: number | undefined;
	private testSkillModifierIndex: number;

	constructor(params: CharacterAttackConstructorParams) {
		const {attack, modifiers, testSkillModifierIndex, damageAttributeModifierIndex} = params;
		this.attack = attack;
		this.damageAttributeModifierIndex = damageAttributeModifierIndex;
		this.testSkillModifierIndex = testSkillModifierIndex;
		this.modifiers = new CharacterAttackModifiers(modifiers);
	}

	changeTestSkillModifier(modifier: FixedModifier) {
		this.modifiers.test.fixed.remove(this.testSkillModifierIndex);
		this.testSkillModifierIndex = this.modifiers.test.fixed.add(modifier);
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

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedCharacterAttack {
		return {
			attack: this.attack.serialize(),
			modifiers: {
				test: this.modifiers.test.serialize(sheet, context),
				damage: this.modifiers.damage.serialize(sheet, context),
			},
		};
	}
}
