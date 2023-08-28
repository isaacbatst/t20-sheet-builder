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
}

export type TriggeredEffectModifiers = {
	attack?: Modifiers;
	damage?: Modifiers;
	skillExceptAttack?: Modifiers;
	skill?: Modifiers;
};

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

export type SerializedTriggeredEffect = SerializedSheetAbilityEffect & {
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

	override serialize(): SerializedTriggeredEffect {
		return {
			...super.serialize(),
			triggerEvent: this.triggerEvent,
			name: this.name,
		};
	}

	abstract enable({modifiersIndexes, modifiers}: {
		modifiers: TriggeredEffectModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}, activation: A): {manaCost?: ManaCost};

	abstract disable({modifiersIndexes, modifiers}: {
		modifiers: TriggeredEffectModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}): void;
}
