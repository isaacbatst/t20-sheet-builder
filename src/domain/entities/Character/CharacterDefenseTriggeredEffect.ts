import {type SerializedTriggeredEffect, type TriggerEvent, type TriggeredEffect, type TriggeredEffectModifiers} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {type Context} from '../Context';
import {type ManaCost} from '../ManaCost';
import {type Modifiers, type SerializedModifiers} from '../Modifier';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {type CharacterModifierName} from './CharacterModifiers';

export type EnabledEffectModifiersIndexes = Partial<Record<TriggerEvent, number>>;

export type SerializedCharacterAttackTriggeredEffect = {
	effect: SerializedTriggeredEffect;
	modifiers: Partial<Record<CharacterModifierName, SerializedModifiers>>;
};

export class CharacterDefenseTriggeredEffect {
	readonly modifiersIndexes: EnabledEffectModifiersIndexes = {};
	readonly modifiers: TriggeredEffectModifiers;

	private isEnabled = false;
	private manaCost?: ManaCost;

	constructor(readonly effect: TriggeredEffect, defenseModifiers: Modifiers) {
		this.modifiers = {
			defense: defenseModifiers,
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
				defense: this.modifiers.defense?.serialize(sheet, context),
			},
		};
	}
}
