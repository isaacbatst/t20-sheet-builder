import {type TranslatableName} from '..';
import {type TriggeredEffect, type TriggeredEffectName} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {DiceRoll} from '../Dice/DiceRoll';
import {type ContextualModifiersList, Modifiers, type ModifiersTotalCalculators} from '../Modifier';
import {Random, type RandomInterface} from '../Random';
import {type Attribute} from '../Sheet/Attributes';
import {type SheetSkill, type SkillRollResult} from './SheetSkill';
import {CharacterSkillTriggeredEffect} from './CharacterSkillTriggeredEffect';

export class CharacterSkill {
	static test = new DiceRoll(1, 20);
	readonly triggeredEffects = new Map<TriggeredEffectName, CharacterSkillTriggeredEffect>();

	constructor(
		readonly sheetSkill: SheetSkill,
		readonly modifiers: {
			skill: Modifiers;
			skillExceptAttack: Modifiers;
		},
		triggeredEffects: Map<TriggeredEffectName, TriggeredEffect>,
		readonly modifiersCalculators: ModifiersTotalCalculators,
	) {
		modifiers.skill.fixed.append(this.sheetSkill.skill.fixedModifiers);
		modifiers.skill.contextual.append(this.sheetSkill.skill.contextualModifiers);
		triggeredEffects.forEach((triggeredEffect, name) => {
			this.triggeredEffects.set(name, new CharacterSkillTriggeredEffect(triggeredEffect, modifiers));
		});
	}

	enableTriggeredEffect(activation: TriggeredEffectActivation) {
		const triggeredEffect = this.triggeredEffects.get(activation.effectName);

		if (!triggeredEffect) {
			throw new Error(`Triggered effect ${activation.effectName} not found`);
		}

		triggeredEffect.enable(activation);
	}

	disableTriggeredEffect(effectName: TriggeredEffectName) {
		if (!this.triggeredEffects.has(effectName)) {
			throw new Error(`Triggered effect ${effectName} not found`);
		}

		this.triggeredEffects.get(effectName)?.disable();
	}

	getModifiersTotal(isAttack = false): number {
		let total = 0;
		if (!isAttack) {
			total += this.modifiers.skillExceptAttack.getTotal(this.modifiersCalculators);
		}

		total += this.modifiers.skill.getTotal(this.modifiersCalculators);
		return total;
	}

	getAttributeModifier(): number {
		return this.sheetSkill.getAttributeModifier();
	}

	changeAttribute(attribute: Attribute) {
		this.sheetSkill.changeAttribute(attribute);
	}

	getTriggeredEffects() {
		return this.triggeredEffects;
	}

	getFixedModifier(type: keyof CharacterSkill['modifiers'], name: TranslatableName) {
		return this.modifiers[type].fixed.get(name);
	}

	getContextualModifier(name: TranslatableName) {
		return this.sheetSkill.getContextualModifier(name);
	}

	roll(random: RandomInterface = new Random(), threat = 20, isAttack = false): SkillRollResult {
		const skillRollResult = this.sheetSkill.roll(random, threat);

		const fixedModifiers = this.modifiers.skill.fixed.clone();
		if (!isAttack) {
			fixedModifiers.append(this.modifiers.skillExceptAttack.fixed);
		}

		const contextualModifiers = this.modifiers.skill.contextual.clone();
		if (!isAttack) {
			contextualModifiers.append(this.modifiers.skillExceptAttack.contextual);
		}

		fixedModifiers.append(skillRollResult.modifiers.fixed);
		contextualModifiers.append(skillRollResult.modifiers.contextual);

		return {
			isCritical: skillRollResult.isCritical,
			isFumble: skillRollResult.isFumble,
			roll: skillRollResult.roll,
			modifiers: new Modifiers({
				fixed: fixedModifiers,
				contextual: contextualModifiers as ContextualModifiersList,
			}),
			modifiersTotal: this.getModifiersTotal(isAttack),
			total: skillRollResult.total + this.getModifiersTotal(isAttack),
		};
	}
}
