import {RegisterTriggeredEffect} from '../Action/RegisterTriggeredEffect';
import type {PowerName} from '../Power/PowerName';
import type {RaceAbilityName} from '../Race/RaceAbilityName';
import type {RoleAbilityName} from '../Role/RoleAbilityName';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SpellName} from '../Spell/SpellName';
import {type TranslatableName} from '../Translator';
import type {AbilityEffectsInterface} from './AbilityEffects';

export type AbilityType = 'role' | 'race' | 'spell' | 'power';

export type AbilityInterface = {
	name: string;
	effects: AbilityEffectsInterface;
	abilityType: AbilityType;
	addToSheet(transaction: TransactionInterface, source: TranslatableName): void;
};

export type AbilityName = RoleAbilityName | PowerName | RaceAbilityName | SpellName;

export abstract class Ability implements AbilityInterface {
	abstract readonly effects: AbilityEffectsInterface;
	constructor(
		readonly name: AbilityName,
		readonly abilityType: AbilityType,
	) {}

	addToSheet(transaction: TransactionInterface, source: TranslatableName): void {
		this.applyPassiveEffects(transaction);
		this.registerTriggeredEffects(transaction);
	}

	private applyPassiveEffects(transaction: TransactionInterface) {
		Object.values(this.effects.passive).forEach(effect => {
			effect.apply(transaction);
		});
	}

	private registerTriggeredEffects(transaction: TransactionInterface) {
		Object.values(this.effects.triggered).forEach(effect => {
			const action = new RegisterTriggeredEffect({
				payload: {
					effect,
					event: effect.triggerEvent,
					source: this.name,
				},
				transaction,
			});
			transaction.run(action);
		});
	}
}
