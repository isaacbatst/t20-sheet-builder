import {type AbilityEffectStatic} from './AbilityEffectStatic';

export class AbilityEffectsStatic {
	passive: Record<string, AbilityEffectStatic>;
	triggered: Record<string, AbilityEffectStatic>;
	activateable: Record<string, AbilityEffectStatic>;
	roleplay: Record<string, AbilityEffectStatic>;

	constructor(params?: {
		passive?: Record<string, AbilityEffectStatic>;
		triggered?: Record<string, AbilityEffectStatic>;
		activateable?: Record<string, AbilityEffectStatic>;
		roleplay?: Record<string, AbilityEffectStatic>;
	}) {
		this.passive = params?.passive ?? {};
		this.triggered = params?.triggered ?? {};
		this.activateable = params?.activateable ?? {};
		this.roleplay = params?.roleplay ?? {};
	}
}
