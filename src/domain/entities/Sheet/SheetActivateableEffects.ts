import {type ActivateableAbilityEffect} from '../Ability';
import {type TranslatableName} from '../Translator';

export class SheetActivateableEffects {
	private readonly effects = new Map<TranslatableName, ActivateableAbilityEffect>();

	register(effect: ActivateableAbilityEffect) {
		this.effects.set(effect.source, effect);
	}

	getEffects() {
		return this.effects;
	}

	getEffect(source: TranslatableName) {
		return this.effects.get(source);
	}
}
