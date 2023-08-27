import {type TriggeredEffectName} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {WeaponAttack} from '../Attack';
import type {Attack, SerializedAttack} from '../Attack/Attack';
import {type ContextInterface} from '../Context';
import {type RollResult} from '../Dice/RollResult';
import {type OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {ManaCost} from '../ManaCost';
import {type TriggeredEffectMap} from '../Map';
import {FixedModifier} from '../Modifier';
import {type Modifiers, type ModifiersMaxTotalCalculators, type ModifiersTotalCalculators, type SerializedModifiers} from '../Modifier/Modifiers';
import {Random, type RandomInterface} from '../Random';
import {type Attribute, type Attributes} from '../Sheet';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {type SheetSkill, type SheetSkillsObject} from '../Skill/SheetSkill';
import {CharacterAttackTriggeredEffect} from './CharacterAttackTriggeredEffect';
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
	modifiers?: Partial<CharacterAttackModifiers>;
	attributes: Attributes;
	maxTotalCalculators: ModifiersMaxTotalCalculators;
	skills: SheetSkillsObject;
	weapon: OffensiveWeapon;
	totalCalculators: ModifiersTotalCalculators;
	triggeredEffects: TriggeredEffectMap;
};

export class CharacterAttack {
	readonly modifiers: CharacterAttackModifiers;
	readonly attack: Attack;
	private readonly damageAttributeModifierIndex: number | undefined;
	private readonly maxTotalCalculators: ModifiersMaxTotalCalculators;
	private readonly totalCalculators: ModifiersTotalCalculators;
	private readonly attributes: Attributes;
	private readonly skills: SheetSkillsObject;
	private readonly triggeredEffects: Map<TriggeredEffectName, CharacterAttackTriggeredEffect>;

	constructor(params: CharacterAttackConstructorParams) {
		const {modifiers, attributes, maxTotalCalculators, skills, totalCalculators, weapon} = params;
		this.modifiers = new CharacterAttackModifiers(modifiers);
		this.attack = new WeaponAttack(weapon);
		this.damageAttributeModifierIndex = this.addDamageAttributeFixedModifier(attributes);

		this.totalCalculators = totalCalculators;
		this.maxTotalCalculators = maxTotalCalculators;
		this.attributes = attributes;
		this.skills = skills;
		this.triggeredEffects = new Map();

		params.triggeredEffects.forEach((effect, effectName) => {
			this.triggeredEffects.set(effectName, new CharacterAttackTriggeredEffect(effect, this.modifiers));
		});
	}

	changeTestAttackAttribute(attribute: Attribute) {
		const skillName = this.attack.getTestDefaultSkill();
		const customTestAttributes = this.attack.getCustomTestAttributes();
		const allowed = customTestAttributes.has(attribute) || attribute === this.skills[skillName].skill.attribute;

		if (!allowed) {
			throw new Error('INVALID_ATTRIBUTE');
		}

		this.skills[skillName].changeAttribute(attribute);
	}

	getDefaultTestSkill(): SheetSkill {
		return this.skills[this.attack.getTestDefaultSkill()];
	}

	roll(random: RandomInterface = new Random()): AttackResult {
		const skill = this.skills[this.attack.getTestDefaultSkill()];
		const {damage, test} = this.attack.roll(random, skill);
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
				rollResult: test.roll,
				modifiers: this.modifiers.test,
				modifiersTotal: testModifiersTotal,
				total: test.total + this.getTestModifiersTotal(),
			},
			isCritical: test.isCritical,
			isFumble: test.isFumble,
		};
	}

	enableTriggeredEffect(activation: TriggeredEffectActivation) {
		const effect = this.triggeredEffects.get(activation.effectName);
		if (!effect) {
			throw new Error('INVALID_TRIGGERED_EFFECT');
		}

		effect.enable(activation);
	}

	disableTriggeredEffect(effectName: TriggeredEffectName) {
		const effect = this.triggeredEffects.get(effectName);
		if (!effect) {
			throw new Error('INVALID_TRIGGERED_EFFECT');
		}

		effect.disable();
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

	getTriggeredEffects(): Map<TriggeredEffectName, CharacterAttackTriggeredEffect> {
		return this.triggeredEffects;
	}

	getManaCost(): ManaCost {
		let sum = 0;

		this.triggeredEffects.forEach(effect => {
			if (effect.getIsEnabled()) {
				sum += effect.getManaCost()?.value ?? 0;
			}
		});

		return new ManaCost(sum);
	}

	getTestSkillAttributeModifier(): number {
		const skillAttribute = this.getDefaultTestSkill().skill.attribute;
		return this.attributes[skillAttribute];
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

	private addDamageAttributeFixedModifier(attributes: Attributes): number | undefined {
		const damageAttribute = this.attack.getDamageAttribute();
		if (damageAttribute) {
			const damageAttributeModifier = new FixedModifier(damageAttribute, attributes[damageAttribute]);
			return this.modifiers.damage.fixed.add(damageAttributeModifier);
		}
	}
}
