import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability/AbilityEffects';
import type {Attribute} from '../../../../Sheet';
import type {SpellLearnFrequency} from '../../../SpellsAbility';
import {type SerializedArcanistPath} from '../../SerializedArcanist';
import {ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistPathWizardFocusEffect} from './ArcanistPathWizardFocusEffect';

export class ArcanistPathWizard extends ArcanistPath {
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	readonly pathName = ArcanistPathName.wizard;
	override effects: AbilityEffectsInterface & {
		roleplay: {
			focus: ArcanistPathWizardFocusEffect;
		};
	};

	constructor() {
		super();
		this.effects = new AbilityEffects({
			roleplay: {
				focus: new ArcanistPathWizardFocusEffect(),
			},
		});
	}

	override serializePath(): SerializedArcanistPath {
		return {
			name: this.pathName,
		};
	}
}
