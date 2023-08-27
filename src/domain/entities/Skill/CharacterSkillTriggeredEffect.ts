import {type TriggeredEffect} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {type EnabledEffectModifiersIndexes} from '../Character/CharacterAttackTriggeredEffect';
import {type ManaCost} from '../ManaCost';
import {type Modifiers, type Modifier} from '../Modifier';

export class CharacterSkillTriggeredEffect {
	readonly modifiersIndexes: EnabledEffectModifiersIndexes = {};

	private isEnabled = false;
	private manaCost?: ManaCost;

	constructor(readonly effect: TriggeredEffect, readonly modifiers: {
		skill: Modifiers;
		skillExceptAttack: Modifiers;
	}) {}

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
			modifiers: this.modifiers,
			modifiersIndexes: this.modifiersIndexes,
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
