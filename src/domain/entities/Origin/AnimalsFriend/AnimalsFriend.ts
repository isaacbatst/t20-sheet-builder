import {EquipmentAnimal} from '../../Inventory/Equipment/EquipmentAnimal/EquipmentAnimal';
import type {EquipmentName} from '../../Inventory/Equipment/EquipmentName';
import type {GeneralPowerName} from '../../Power';
import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {SkillName} from '../../Skill/SkillName';
import {Origin} from '../Origin';
import type {OriginBenefit} from '../OriginBenefit/OriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export type AnimalsFriendEquipments = EquipmentName.hound | EquipmentName.horse | EquipmentName.pony | EquipmentName.trobo;

export class AnimalsFriend extends Origin<SerializedOrigins['animalsFriend']> {
	static readonly originName = OriginName.animalsFriend;
	static equipments = 'Cão de caça, cavalo, pônei ou trobo (escolha um).';
	static skills: SkillName[] = [SkillName.animalHandling, SkillName.animalRide];
	static generalPowers: GeneralPowerName[] = [];
	static originPower = OriginPowerName.specialFriend;

	readonly name = AnimalsFriend.originName;
	constructor(
		override chosenBenefits: Array<OriginBenefit<SerializedOrigins['animalsFriend']['originPower']>>,
		readonly chosenAnimal: AnimalsFriendEquipments,
	) {
		super(chosenBenefits, {
			skills: AnimalsFriend.skills,
			generalPowers: AnimalsFriend.generalPowers,
			originPower: AnimalsFriend.originPower,
		}, [
			new EquipmentAnimal(chosenAnimal),
		]);
	}

	override serialize(): SerializedOrigins['animalsFriend']['origin'] {
		return {
			name: this.name,
			chosenBenefits: this.serializeBenefits(),
			equipments: this.serializeEquipments(),
			chosenAnimal: this.chosenAnimal,
		};
	}
}

