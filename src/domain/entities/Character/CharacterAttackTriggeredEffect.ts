import {type TriggeredEffect} from '../Ability';
import {type TriggeredEffectActivation} from '../Ability/TriggeredEffectActivation';
import {type ManaCost} from '../ManaCost';
import {type CharacterAttackModifiers} from './CharactterAttackModifiers';

export type EnabledEffectModifiersIndexes = {
	attack?: number;
	damage?: number;
};

export class CharacterAttackTriggeredEffect {
	readonly modifiersIndexes: EnabledEffectModifiersIndexes = {};

	private isEnabled = false;
	private manaCost?: ManaCost;

	constructor(readonly effect: TriggeredEffect) {}

	enable(modifiers: CharacterAttackModifiers, activation: TriggeredEffectActivation): void {
		const {manaCost} = this.effect.enable({
			modifiersIndexes: this.modifiersIndexes,
			modifiers,
		}, activation);
		if (manaCost) {
			this.manaCost = manaCost;
		}

		this.isEnabled = true;
	}

	getIsEnabled() {
		return this.isEnabled;
	}

	getManaCost() {
		return this.manaCost;
	}
}
