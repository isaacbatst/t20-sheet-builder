import {type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type SkillName} from '../../Skill';

export type OriginBenefitChosenOriginPower = {
	type: 'originPower';
	name: OriginPowerName;
};

export type SerializedOriginBenefit<OriginPower extends OriginBenefitChosenOriginPower = OriginBenefitChosenOriginPower> = {
	type: 'skills';
	name: SkillName;
} | {
	type: 'generalPowers';
	name: GeneralPowerName;
} | OriginPower;

export type SerializedChurchMember = {
	type: 'originPower';
	name: OriginPowerName.churchMember;
};

export type SerializedSpecialFriend = {
	type: 'originPower';
	name: OriginPowerName.specialFriend;
	skill: SkillName;
};

export type SerializedOriginPowers = SerializedChurchMember | SerializedSpecialFriend;

export type SerializedOriginBenefitsAcolyte = SerializedOriginBenefit<SerializedChurchMember>;
export type SerializedOriginBenefitsAnimalsFriend = SerializedOriginBenefit<SerializedSpecialFriend>;

export type SerializedOriginBenefits =
SerializedOriginBenefitsAcolyte
| SerializedOriginBenefitsAnimalsFriend;
