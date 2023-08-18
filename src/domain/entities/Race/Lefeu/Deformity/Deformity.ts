import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {type SkillName} from '../../../Skill';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {DeformityEffect} from './DeformityEffect';

export class Deformity extends RaceAbility {
	effects = new AbilityEffects({
		passive: {
			default: new DeformityEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.deformity);
	}

	addDeformity(choices: SkillName) {
		this.effects.passive.default.addChoice(choices);
	}

	serializeChoices() {
		return this.effects.passive.default.choices.map(choice => ({
			type: 'skill' as const,
			name: choice,
		}));
	}
}
