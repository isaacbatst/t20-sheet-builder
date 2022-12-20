import type {CharacterInterface} from '../../CharacterInterface';
import type {InGameContext} from '../../InGameContext';
import {SkillNameEnum} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityNameEnum} from '../RaceAbilityName';

export class RockKnowledge extends RaceAbility {
	static condition(context: InGameContext) {
		return context.getCurrentLocation().isUnderground;
	}

	constructor() {
		super(
			RaceAbilityNameEnum.rockKnowledge,
			'passive',
		);
	}

	apply(character: CharacterInterface): void {
		character.setVision(Vision.dark);
		character.addOtherModifierToSkill(
			RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.perception, RockKnowledge.condition,
		);
		character.addOtherModifierToSkill(
			RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.survival, RockKnowledge.condition,
		);
	}
}
