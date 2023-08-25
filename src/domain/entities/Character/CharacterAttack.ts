import type {Attack, SerializedAttack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/RollResult';
import {type FixedModifier} from '../Modifier';
import {type Modifiers, type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators, type SerializedModifiers} from '../Modifier/Modifiers';
import {type RandomInterface} from '../Random';
import {type Attributes} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {CharacterAttackModifiers} from './CharactterAttackModifiers';

export type AttackResult = {
	damage: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
		modifiersTotal: number;
	};
	test: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
		modifiersTotal: number;
	};
	isCritical: boolean;
	isFumble: boolean;
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
	totalCalculators: ModifiersTotalCalculators;
	maxTotalCalculators: ModifiersMaxTotalCalculators;
	attributes: Attributes;
};

export class CharacterAttack {
	readonly modifiers: CharacterAttackModifiers;
	readonly attack: Attack;
	private readonly damageAttributeModifierIndex: number | undefined;
	private testSkillModifierIndex: number;
	private readonly maxTotalCalculators: ModifiersMaxTotalCalculators;
	private readonly totalCalculators: ModifiersTotalCalculators;
	private readonly attributes: Attributes;

	constructor(params: CharacterAttackConstructorParams) {
		const {attack, modifiers, testSkillModifierIndex, damageAttributeModifierIndex} = params;
		this.attack = attack;
		this.damageAttributeModifierIndex = damageAttributeModifierIndex;
		this.testSkillModifierIndex = testSkillModifierIndex;
		this.totalCalculators = params.totalCalculators;
		this.maxTotalCalculators = params.maxTotalCalculators;
		this.attributes = params.attributes;
		this.modifiers = new CharacterAttackModifiers(modifiers);
	}

	changeTestSkillModifier(modifier: FixedModifier) {
		this.modifiers.test.fixed.remove(this.testSkillModifierIndex);
		this.testSkillModifierIndex = this.modifiers.test.fixed.add(modifier);
	}

	roll(random: RandomInterface): AttackResult {
		const {damage, test, isCritical, isFumble} = this.attack.roll(random);
		const damageModifiersTotal = this.getDamageModifiersTotal();
		const testModifiersTotal = this.getTestModifiersTotal();
		return {
			damage: {
				rollResult: damage,
				modifiers: this.modifiers.damage,
				modifiersTotal: damageModifiersTotal,
				total: damage.total + this.getDamageModifiersTotal(),
			},
			test: {
				rollResult: test,
				modifiers: this.modifiers.test,
				modifiersTotal: testModifiersTotal,
				total: test.total + this.getTestModifiersTotal(),
			},
			isCritical,
			isFumble,
		};
	}

	getTestModifiersMaxTotal() {
		return this.modifiers.test.getMaxTotal(this.attributes, this.maxTotalCalculators);
	}

	getTestModifiersTotal() {
		return this.modifiers.test.getTotal(this.totalCalculators);
	}

	getDamageModifiersMaxTotal() {
		return this.modifiers.damage.getMaxTotal(this.attributes, this.maxTotalCalculators);
	}

	getDamageModifiersTotal() {
		return this.modifiers.damage.getTotal(this.totalCalculators);
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
