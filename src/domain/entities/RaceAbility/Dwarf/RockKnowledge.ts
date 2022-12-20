import type {CharacterInterface} from '../../CharacterInterface';
import {SkillNameEnum} from '../../Skill/SkillName';
import {Vision} from '../../Vision';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityNameEnum} from '../RaceAbilityName';

export class RockKnowledge extends RaceAbility {
	constructor() {
		super(
			RaceAbilityNameEnum.rockKnowledge,
			'passive',
		);
	}

	apply(character: CharacterInterface): void {
		character.setVision(Vision.dark);
		character.addOtherModifierToSkill(RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.perception);
		character.addOtherModifierToSkill(RaceAbilityNameEnum.rockKnowledge, 2, SkillNameEnum.survival);
	}
}
