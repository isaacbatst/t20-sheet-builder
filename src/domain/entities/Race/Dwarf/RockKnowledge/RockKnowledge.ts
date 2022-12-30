import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RockKnowledgeEffect} from './RockKnowledgeEffect';

export class RockKnowledge extends RaceAbility {
	effects = new AbilityEffects({
		passive: {
			default: new RockKnowledgeEffect(),
		},
	});

	constructor() {
		super(
			RaceAbilityName.rockKnowledge,
		);
	}
}
