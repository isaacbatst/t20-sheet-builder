import {type SerializedTriggeredEffect, type TriggerEvent, type TriggeredEffect, type TriggeredEffectModifiers} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {type Context} from '../Context';
import {type ManaCost} from '../ManaCost';
import {type SerializedModifiers} from '../Modifier';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {type CharacterModifierName} from './CharacterModifiers';
import {type CharacterAttackModifiers} from './CharactterAttackModifiers';

export type EnabledEffectModifiersIndexes = Partial<Record<CharacterModifierName, number>>;

export type SerializedCharacterAttackTriggeredEffect = {
	effect: SerializedTriggeredEffect;
	modifiers: Partial<Record<CharacterModifierName, SerializedModifiers>>;
};

export class CharacterAttackTriggeredEffect {
	readonly modifiersIndexes: EnabledEffectModifiersIndexes = {};
	readonly modifiers: TriggeredEffectModifiers;

	private isEnabled = false;
	private manaCost?: ManaCost;

	constructor(readonly effect: TriggeredEffect, modifiers: CharacterAttackModifiers) {
		this.modifiers = {
			attack: modifiers.test,
			damage: modifiers.damage,
		};
	}

	enable(activation: TriggeredEffectActivation): void {
		const {manaCost} = this.effect.enable({
			modifiersIndexes: this.modifiersIndexes,
			modifiers: this.modifiers,
		}, activation);
		if (manaCost) {
			this.manaCost = manaCost;
		}

		this.isEnabled = true;
	}

	disable(): void {
		this.effect.disable({
			modifiersIndexes: this.modifiersIndexes,
			modifiers: this.modifiers,
		});
		this.isEnabled = false;
	}

	getIsEnabled() {
		return this.isEnabled;
	}

	getManaCost() {
		return this.manaCost;
	}

	serialize(sheet: SheetInterface, context: Context): SerializedCharacterAttackTriggeredEffect {
		return {
			effect: this.effect.serialize(),
			modifiers: {
				attack: this.modifiers.attack?.serialize(sheet, context),
				damage: this.modifiers.damage?.serialize(sheet, context),
				skillExceptAttack: this.modifiers.skillExceptAttack?.serialize(sheet, context),
				skill: this.modifiers.skill?.serialize(sheet, context),
			},
		};
	}
}
