import {SheetBuilderError} from '../../../Error/SheetBuilderError';
import {GeneralPowerFactory, GeneralPowerName} from '../../../Power';
import {SkillName} from '../../../Skill';
import {type VersatileChoice, type VersatileChoiceType} from './VersatileChoice';
import {VersatileChoicePower} from './VersatileChoicePower';
import {VersatileChoiceSkill} from './VersatileChoiceSkill';

export class VersatileChoiceFactory {
	static make(type: VersatileChoiceType, choice: SkillName | GeneralPowerName): VersatileChoice {
		if (type === 'skill') {
			return VersatileChoiceFactory.makeVersatileChoiceSkill(choice);
		}

		return VersatileChoiceFactory.makeVersatileChoicePower(choice);
	}

	private static makeVersatileChoiceSkill(choice: string): VersatileChoice {
		if (!VersatileChoiceFactory.isSkill(choice)) {
			throw new SheetBuilderError('INVALID_SKILL_CHOICE');
		}

		return new VersatileChoiceSkill(choice);
	}

	private static makeVersatileChoicePower(choice: SkillName | GeneralPowerName): VersatileChoice {
		if (!VersatileChoiceFactory.isPower(choice)) {
			throw new SheetBuilderError('INVALID_POWER_CHOICE');
		}

		const power = GeneralPowerFactory.make({name: choice});
		return new VersatileChoicePower(power);
	}

	private static isPower(choice: string): choice is GeneralPowerName {
		return choice in GeneralPowerName;
	}

	private static isSkill(choice: string): choice is SkillName {
		return choice in SkillName;
	}
}
