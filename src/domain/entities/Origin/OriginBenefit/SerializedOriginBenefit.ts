import {type OriginPowerName} from '../../Power';
import {type SerializedSheetAbilityEffect} from '../../Sheet/SerializedSheet/SerializedSheetInterface';
import {type SkillName} from '../../Skill';
import {type SerializedOriginBenefitGeneralPower} from './OriginBenefitGeneralPower';

export type OriginBenefitChosenOriginPower = {
	type: 'originPower';
	name: OriginPowerName;
};

export type SerializedOriginBenefitSkill = {
	type: 'skills';
	name: SkillName;
};

export type SerializedOriginBenefit<OriginPower extends SerializedOriginPowers = SerializedOriginPowers> =
	SerializedOriginBenefitSkill | SerializedOriginBenefitGeneralPower | SerializedOriginPower<OriginPower>;

export type SerializedChurchMember = {
	name: OriginPowerName.churchMember;
};

export type SerializedSpecialFriend = {
	name: OriginPowerName.specialFriend;
	skill: SkillName;
};

export type SerializedGradualMemories = {
	name: OriginPowerName.gradualMemories;
};

export type SerializedOriginPowers =
  | SerializedChurchMember
  | SerializedSpecialFriend
  | SerializedGradualMemories;

export type SerializedOriginPowerBasic = {
	abilityType: 'power';
	type: 'originPower';
	name: OriginPowerName;
	effects: SerializedSheetAbilityEffect[];
};

export type SerializedOriginPower<T extends SerializedOriginPowers = SerializedOriginPowers> = SerializedOriginPowerBasic & T;
export type SerializedOriginBenefitsAcolyte = SerializedOriginBenefit<SerializedChurchMember>;
export type SerializedOriginBenefitsAnimalsFriend = SerializedOriginBenefit<SerializedSpecialFriend>;
export type SerializedOriginBenefitsAmnesic = SerializedOriginBenefit<SerializedGradualMemories>;

export type SerializedOriginBenefits =
 | SerializedOriginBenefitsAcolyte
 | SerializedOriginBenefitsAnimalsFriend
 | SerializedOriginBenefitsAmnesic;
