import {type SerializedSheetAbilityEffect} from '..';
import type {ActivateableAbilityEffect} from './ActivateableAbilityEffect';
import type {PassiveEffect} from './PassiveEffect';
import type {RolePlayEffect} from './RolePlayEffect';
import type {TriggeredEffect} from './TriggeredEffect';

export type AbilityEffectsInterface = {
	passive: Record<string, PassiveEffect>;
	triggered: Record<string, TriggeredEffect>;
	activateable: Record<string, ActivateableAbilityEffect>;
	roleplay: Record<string, RolePlayEffect>;
	serialize(): SerializedSheetAbilityEffect[];
};

export class AbilityEffects<T extends Partial<AbilityEffectsInterface>> implements AbilityEffectsInterface {
	passive: NonNullable<T['passive']>;
	triggered: NonNullable<T['triggered']>;
	activateable: NonNullable<T['activateable']>;
	roleplay: NonNullable<T['roleplay']>;

	constructor(params?: T) {
		this.passive = params?.passive ?? {};
		this.triggered = params?.triggered ?? {};
		this.activateable = params?.activateable ?? {};
		this.roleplay = params?.roleplay ?? {};
	}

	serialize(): SerializedSheetAbilityEffect[] {
		const effects = {
			passive: Object.values(this.passive),
			triggered: Object.values(this.triggered),
			activateable: Object.values(this.activateable),
			roleplay: Object.values(this.roleplay),
		};

		return Object.values(effects).flat().map(effect => effect.serialize());
	}
}
