import {EquipmentAdventure} from '../../Inventory/Equipment/EquipmentAdventure/EquipmentAdventure';
import {EquipmentClothing} from '../../Inventory/Equipment/EquipmentClothing/EquipmentClothing';
import {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import {GeneralPowerName} from '../../Power/GeneralPower/GeneralPowerName';
import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {SkillName} from '../../Skill/SkillName';
import {Origin} from '../Origin';
import type {OriginBenefit} from '../OriginBenefit/OriginBenefit';
import {type SerializedOriginBenefitsAcolyte} from '../OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigin} from '../SerializedOrigin';

export type SerializedChosenChurchMember = {
	name: OriginPowerName.churchMember;
};

export type SerializedAcolyte = SerializedOrigin<SerializedOriginBenefitsAcolyte>;

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

	constructor(override chosenBenefits: Array<OriginBenefit<SerializedOriginBenefitsAcolyte>>) {
		super(chosenBenefits, {
			skills: Acolyte.skills,
			generalPowers: Acolyte.generalPowers,
			originPower: Acolyte.originPower,
		});
	}

	override serialize(): SerializedAcolyte {
		return {
			name: this.name,
			choosenBenefits: this.chosenBenefits.map(originBenefit => originBenefit.serialize()),
		};
	}
}

