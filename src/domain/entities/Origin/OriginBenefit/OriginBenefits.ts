import {type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type SkillName} from '../../Skill';

export type OriginBenefits = {
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
};
