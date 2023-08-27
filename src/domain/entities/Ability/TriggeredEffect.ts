import {type EnabledEffectModifiersIndexes} from '../Character/CharacterAttackTriggeredEffect';
import {type CharacterAttackModifiers} from '../Character/CharactterAttackModifiers';
import {type ManaCost} from '../ManaCost';
import type {ActivateableAbilityEffectInterface, ActivateableEffectParams, ActivationType} from './ActivateableAbilityEffect';
import {ActivateableAbilityEffect} from './ActivateableAbilityEffect';
import {type SpecialAttackActivation, type TriggeredEffectActivation} from './TriggeredEffectActivation';
import {type TriggeredEffectName} from './TriggeredEffectName';

export enum TriggerEvent {
	attack = 'attack',
	defend = 'defend',
	skillTest = 'skillTest',
	skillTestExceptAttack = 'skillTestExceptAttack',
}

export type TriggeredEffectInterface = ActivateableAbilityEffectInterface & {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;
	enable({enabledTriggeredEffectsModifiers, modifiers}: {
		modifiers: CharacterAttackModifiers;
		enabledTriggeredEffectsModifiers: Map<TriggeredEffectName, number>;
	}): void;
};

type TriggeredEffectParams = ActivateableEffectParams & {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;
};

export abstract class TriggeredEffect<A extends TriggeredEffectActivation = TriggeredEffectActivation> extends ActivateableAbilityEffect {
	triggerEvent: TriggerEvent;
	name: TriggeredEffectName;

	override get activationType(): ActivationType {
		return 'triggered';
	}

	constructor(
		params: TriggeredEffectParams,
	) {
		super(params);
		this.triggerEvent = params.triggerEvent;
		this.name = params.name;
	}

	abstract enable({modifiersIndexes, modifiers}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}, activation: A): {manaCost?: ManaCost};

	abstract disable({modifiersIndexes, modifiers}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}): void;
}
