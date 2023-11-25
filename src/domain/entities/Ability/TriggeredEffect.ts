import {type} from 'os';
import {type CharacterModifierName} from '../Character';
import {type EnabledEffectModifiersIndexes} from '../Character/CharacterAttackTriggeredEffect';
import {type CharacterAttackModifiers} from '../Character/CharactterAttackModifiers';
import {type ManaCost} from '../ManaCost';
import {type Modifiers} from '../Modifier';
import {type SerializedSheetAbilityEffect} from '../Sheet';
import type {ActivateableAbilityEffectInterface, ActivateableEffectParams, ActivationType} from './ActivateableAbilityEffect';
import {ActivateableAbilityEffect} from './ActivateableAbilityEffect';
import {type TriggeredEffectActivation} from './TriggeredEffectActivation';
import {type TriggeredEffectName} from './TriggeredEffectName';

export enum TriggerEvent {
	attack = 'attack',
	defend = 'defend',
	skillTest = 'skillTest',
	skillTestExceptAttack = 'skillTestExceptAttack',
	resistanceTest = 'resistanceTest',
}

export type TriggeredEffectModifiers = Partial<Record<CharacterModifierName, Modifiers>>;

export type TriggeredEffectInterface = ActivateableAbilityEffectInterface & {
	triggerEvents: TriggerEvent[];
	name: TriggeredEffectName;
	enable({enabledTriggeredEffectsModifiers, modifiers}: {
		modifiers: CharacterAttackModifiers;
		enabledTriggeredEffectsModifiers: Map<TriggeredEffectName, number>;
	}): void;
};

type TriggeredEffectParams = ActivateableEffectParams & {
	triggerEvents: TriggerEvent[] | TriggerEvent;
	name: TriggeredEffectName;
};

export type SerializedTriggeredEffect = SerializedSheetAbilityEffect & {
	triggerEvents: TriggerEvent[];
	name: TriggeredEffectName;
};

export type TriggeredEffectEnableParams = {
	modifiers: TriggeredEffectModifiers;
	modifiersIndexes: EnabledEffectModifiersIndexes;
};

export type	TriggeredEffectDisableParams = {
	modifiers: TriggeredEffectModifiers;
	modifiersIndexes: EnabledEffectModifiersIndexes;
};

export abstract class TriggeredEffect<A extends TriggeredEffectActivation = TriggeredEffectActivation> extends ActivateableAbilityEffect {
	triggerEvents: TriggerEvent[];
	name: TriggeredEffectName;

	override get activationType(): ActivationType {
		return 'triggered';
	}

	constructor(
		params: TriggeredEffectParams,
	) {
		super(params);
		this.triggerEvents = Array.isArray(params.triggerEvents)
			? params.triggerEvents
			: [params.triggerEvents];
		this.name = params.name;
	}

	override serialize(): SerializedTriggeredEffect {
		return {
			...super.serialize(),
			triggerEvents: this.triggerEvents,
			name: this.name,
		};
	}

	abstract enable({modifiersIndexes, modifiers}: TriggeredEffectEnableParams, activation: A): {manaCost?: ManaCost};
	abstract disable({modifiersIndexes, modifiers}: TriggeredEffectDisableParams): void;
}
