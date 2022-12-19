import type {OtherModifierAdderCharacter, ProgressingCharacter} from '../Character';
import {SkillNameEnum} from '../Skill/SkillName';
import {Step} from '../StepDescriptionGenerator/StepDescriptionGenerator';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class Dodge extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.dodge,
			'passive',
		);
	}

	apply(character: OtherModifierAdderCharacter & ProgressingCharacter) {
		character.addOtherModifierToDefense(GeneralPowerNameEnum.dodge, 2);
		character.addOtherModifierToSkill(GeneralPowerNameEnum.dodge, 2, SkillNameEnum.reflexos);
		character.saveStep(Step.raceAbilitiesAppliance);
	}
}
