import type {Equipment} from '../Inventory/Equipment/Equipment';
import {EquipmentAnimal} from '../Inventory/Equipment/EquipmentAnimal/EquipmentAnimal';
import type {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import type {GeneralPowerName} from '../Power';
import {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import {SkillName} from '../Skill/SkillName';
import {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';
import {OriginName} from './OriginName';
import type {OriginStatic} from './OriginStatic';

type AnimalsFriendEquipments = EquipmentName.hound | EquipmentName.horse | EquipmentName.pony | EquipmentName.trobo;

const animalsFriend: OriginStatic = class AnimalsFriend extends Origin {
	static equipments: Equipment[] = [];
	static originName: OriginName = OriginName.animalsFriend;
	static skills: SkillName[] = [SkillName.animalHandling, SkillName.animalRide];
	static generalPowers: GeneralPowerName[] = [];
	static originPower = OriginPowerName.specialFriend;

	equipments: Equipment[];
	name = AnimalsFriend.originName;

	constructor(chosenBenefits: OriginBenefit[], chosenAnimal: AnimalsFriendEquipments) {
		super(chosenBenefits, {
			skills: AnimalsFriend.skills,
			generalPowers: AnimalsFriend.generalPowers,
			originPower: AnimalsFriend.originPower,
		});
		this.equipments = [new EquipmentAnimal(chosenAnimal)];
	}
};

export {
	animalsFriend as AnimalsFriend,
};
