import {type TriggeredEffectModifiers, type TriggeredEffect} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {type ManaCost} from '../ManaCost';
import {type CharacterAttackModifiers} from './CharactterAttackModifiers';

export type EnabledEffectModifiersIndexes = {
	attack?: number;
	damage?: number;
	skillExceptAttack?: number;
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
}
