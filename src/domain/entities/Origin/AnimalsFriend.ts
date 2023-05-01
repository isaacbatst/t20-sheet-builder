import type {Equipment} from '../Inventory/Equipment/Equipment';
import {EquipmentAnimal} from '../Inventory/Equipment/EquipmentAnimal/EquipmentAnimal';
import type {EquipmentName} from '../Inventory/Equipment/EquipmentName';
import {OriginPowerName} from '../Power/OriginPower/OriginPowerName';
import {SkillName} from '../Skill/SkillName';
import {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';
import {OriginName} from './OriginName';

type AnimalsFriendEquipments = EquipmentName.hound | EquipmentName.horse | EquipmentName.pony | EquipmentName.trobo;

export class AnimalsFriend extends Origin {
	name: OriginName = OriginName.animalsFriend;
	equipments: EquipmentAnimal[];

	constructor(chosenBenefits: OriginBenefit[], chosenAnimal: AnimalsFriendEquipments) {
		super(chosenBenefits, {
			skills: [SkillName.animalHandling, SkillName.animalRide],
			generalPowers: [],
			originPower: OriginPowerName.specialFriend,
		});
		this.equipments = [new EquipmentAnimal(chosenAnimal)];
	}
}
