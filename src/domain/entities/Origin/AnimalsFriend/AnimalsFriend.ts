import type {Equipment} from '../../Inventory/Equipment/Equipment';
import {EquipmentAnimal} from '../../Inventory/Equipment/EquipmentAnimal/EquipmentAnimal';
import type {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import type {GeneralPowerName} from '../../Power';
import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {SkillName} from '../../Skill/SkillName';
import {Origin} from '../Origin';
import type {OriginBenefit} from '../OriginBenefit/OriginBenefit';
import {type SerializedOriginBenefitsAnimalsFriend} from '../OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigin} from '../SerializedOrigin';

export type AnimalsFriendEquipments = EquipmentName.hound | EquipmentName.horse | EquipmentName.pony | EquipmentName.trobo;

export class AnimalsFriend extends Origin<SerializedOriginBenefitsAnimalsFriend> {
	static readonly originName = OriginName.animalsFriend;
	static equipments = 'Cão de caça, cavalo, pônei ou trobo (escolha um).';
	static skills: SkillName[] = [SkillName.animalHandling, SkillName.animalRide];
	static generalPowers: GeneralPowerName[] = [];
	static originPower = OriginPowerName.specialFriend;

	readonly name = AnimalsFriend.originName;
	equipments: Equipment[];

	constructor(
		override chosenBenefits: Array<OriginBenefit<SerializedOriginBenefitsAnimalsFriend>>,
		chosenAnimal: AnimalsFriendEquipments,
	) {
		super(chosenBenefits, {
			skills: AnimalsFriend.skills,
			generalPowers: AnimalsFriend.generalPowers,
			originPower: AnimalsFriend.originPower,
		});
		this.equipments = [new EquipmentAnimal(chosenAnimal)];
	}

	override serialize(): SerializedOrigin<SerializedOriginBenefitsAnimalsFriend> {
		return {
			choosenBenefits: this.chosenBenefits.map(benefit => benefit.serialize()),
			name: AnimalsFriend.originName,
		};
	}
}

