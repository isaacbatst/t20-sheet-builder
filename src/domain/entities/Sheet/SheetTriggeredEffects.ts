import {type TriggerEvent} from '../Ability';
import {type TriggeredEffectMap} from '../Map';

export class SheetTriggeredEffects {
	readonly effects: Record<TriggerEvent, TriggeredEffectMap> = {
		attack: new Map(),
		defend: new Map(),
		skillTest: new Map(),
		skillTestExceptAttack: new Map(),
	};

	getByEvent(event: TriggerEvent): TriggeredEffectMap {
		return this.effects[event];
	}
}
