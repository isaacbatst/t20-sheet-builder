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
	SerializedOriginBenefitSkill | SerializedOriginBenefitGeneralPower | OriginPower;

export type SerializedChurchMember = {
	type: 'originPower';
	name: OriginPowerName.churchMember;
};

export type SerializedSpecialFriend = {
	type: 'originPower';
	name: OriginPowerName.specialFriend;
	skill: SkillName;
};

export type SerializedOriginPowers = (SerializedChurchMember | SerializedSpecialFriend);

export type SerializedOriginPower<T extends SerializedOriginPowers = SerializedOriginPowers> = T & {
	abilityType: 'power';
	effects: SerializedSheetAbilityEffect[];
};

export type SerializedOriginBenefitsAcolyte = SerializedOriginBenefit<SerializedChurchMember>;
export type SerializedOriginBenefitsAnimalsFriend = SerializedOriginBenefit<SerializedSpecialFriend>;

export type SerializedOriginBenefits =
SerializedOriginBenefitsAcolyte
| SerializedOriginBenefitsAnimalsFriend;
