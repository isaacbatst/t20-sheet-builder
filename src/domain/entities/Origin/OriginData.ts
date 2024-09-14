import {type EquipmentName, type Equipment} from '../Inventory';
import {type GeneralPowerName, type OriginPowerName} from '../Power';
import {type SkillName} from '../Skill';

type OriginDataParams = {
	equipments: EquipmentName[];
	skills: SkillName[];
	generalPowers: GeneralPowerName[];
	originPower: OriginPowerName;
};

export class OriginData {
	readonly equipments: EquipmentName[];
	readonly skills: SkillName[];
	readonly generalPowers: GeneralPowerName[];
	readonly originPower: OriginPowerName;

	constructor(params: OriginDataParams) {
		this.equipments = params.equipments;
		this.skills = params.skills;
		this.generalPowers = params.generalPowers;
		this.originPower = params.originPower;
	}
}
