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

export type SerializedBlueBlood = {
	name: OriginPowerName.blueBlood;
};

// Frutos do Trabalho
export type SerializedFruitsOfLabor = {
	name: OriginPowerName.fruitsOfLabor;
};

export type SerializedOriginPowerBasic<Name extends OriginPowerName> = {
	abilityType: 'power';
	type: 'originPower';
	name: Name;
	effects: SerializedSheetAbilityEffect[];
};

export type SerializedOriginPowers = {
	churchMember: SerializedOriginPowerBasic<OriginPowerName.churchMember>;
	specialFriend: SerializedOriginPowerBasic<OriginPowerName.specialFriend> & {skill: SkillName};
	gradualMemories: SerializedOriginPowerBasic<OriginPowerName.gradualMemories>;
	blueBlood: SerializedOriginPowerBasic<OriginPowerName.blueBlood>;
	fruitsOfLabor: SerializedOriginPowerBasic<OriginPowerName.fruitsOfLabor>;
	artisticDomain: SerializedOriginPowerBasic<OriginPowerName.artisticDomain>;
};

export type SerializedOriginPower = SerializedOriginPowers[keyof SerializedOriginPowers];

export type SerializedOriginBenefit<OriginPower extends SerializedOriginPower = SerializedOriginPower> =
	SerializedOriginBenefitSkill | SerializedOriginBenefitGeneralPower | OriginPower;
