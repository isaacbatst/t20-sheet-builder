import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability/AbilityEffects';
import type {Attribute} from '../../../../Sheet';
import type {SpellLearnFrequency} from '../../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {type ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';
import {ArcanistPathWizardFocusEffect} from './ArcanistPathWizardFocusEffect';

export class ArcanistPathWizard extends ArcanistPath {
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	readonly pathName = ArcanistPathName.wizard;
	override effects: AbilityEffectsInterface & {
		passive: {
			focus: ArcanistPathWizardFocusEffect;
		};
	};

	constructor(readonly focus: ArcanistPathWizardFocus) {
		super();
		this.effects = new AbilityEffects({
			passive: {
				focus: new ArcanistPathWizardFocusEffect(focus),
			},
		});
	}

	getFocus() {
		return this.effects.passive.focus.focus;
	}
}
