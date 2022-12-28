import {Equipment} from '../Equipment/Equipment';
import type {EquipmentName} from '../Equipment/EquipmentName';
import {SkillName} from '../Skill/SkillName';
import {Origin} from './Origin';
import type {OriginBenefit} from './OriginBenefit';
import {OriginName} from './OriginName';

type AnimalsFriendEquipments = EquipmentName.hound | EquipmentName.horse | EquipmentName.pony | EquipmentName.trobo;

export class AnimalsFriend extends Origin {
	name: OriginName = OriginName.animalsFriend;
	equipments: Equipment[];

	constructor(chosenBenefits: OriginBenefit[], chosenAnimal: AnimalsFriendEquipments) {
		super(chosenBenefits, {
			skills: [SkillName.animalHandling, SkillName.animalRide],
			generalPowers: [],
		});
		this.equipments = [new Equipment(chosenAnimal)];
	}
}
