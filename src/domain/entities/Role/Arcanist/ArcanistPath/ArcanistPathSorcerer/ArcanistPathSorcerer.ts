import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability/AbilityEffects';
import {type Attributes} from '../../../../Sheet';
import {type SpellLearnFrequency} from '../../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {type ArcanistLineage} from './ArcanistLineage/ArcanistLineage';

export class ArcanistPathSorcerer extends ArcanistPath {
	readonly pathName = ArcanistPathName.sorcerer;
	spellsAttribute: keyof Attributes = 'charisma';
	spellLearnFrequency: SpellLearnFrequency = 'odd';
	effects: AbilityEffectsInterface;

	constructor(readonly lineage: ArcanistLineage) {
		super();
		this.effects = new AbilityEffects(lineage.effects.basic);
	}
}
