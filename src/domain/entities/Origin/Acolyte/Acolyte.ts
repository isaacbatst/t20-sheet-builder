import {EquipmentAdventure} from '../../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {EquipmentClothing} from '../../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {GeneralPowerFactory, SpecialFriend, OriginPowerFactory, ChurchMember} from '../../Power';
import {GeneralPowerName} from '../../Power/GeneralPower/GeneralPowerName';
import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {SkillName} from '../../Skill/SkillName';
import {Origin} from '../Origin';
import type {OriginBenefit} from '../OriginBenefit/OriginBenefit';
import {OriginBenefitGeneralPower} from '../OriginBenefit/OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefit/OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefit/OriginBenefitSkill';
import {type SerializedOriginBenefitsAcolyte} from '../OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../OriginName';

export type SerializedChosenChurchMember = {
	name: OriginPowerName.churchMember;
};

export class Acolyte extends Origin<SerializedOriginBenefitsAcolyte> {
	static readonly originName = OriginName.acolyte;
	static equipments = 'Símbolo sagrado, traje de sacerdote.';
	static skills: SkillName[] = [SkillName.cure, SkillName.religion, SkillName.will];
	static generalPowers: GeneralPowerName[] = [GeneralPowerName.medicine, GeneralPowerName.ironWill];
	static originPower = OriginPowerName.churchMember;

	readonly name = Acolyte.originName;

	equipments = [
		new EquipmentAdventure(EquipmentName.sacredSymbol),
		new EquipmentClothing(EquipmentName.priestCostume),
	];

	constructor(chosenBenefits: Array<OriginBenefit<SerializedOriginBenefitsAcolyte>>) {
		super(chosenBenefits, {
			skills: Acolyte.skills,
			generalPowers: Acolyte.generalPowers,
			originPower: Acolyte.originPower,
		});
	}
}

