import {type AnimalsFriendEquipments} from './AnimalsFriend/AnimalsFriend';
import {type SerializedOriginBenefitsAcolyte, type SerializedOriginBenefit, type SerializedOriginBenefitsAnimalsFriend} from './OriginBenefit/SerializedOriginBenefit';
import {type OriginName} from './OriginName';

export type SerializedOrigin<B extends SerializedOriginBenefit = SerializedOriginBenefit, N extends OriginName = OriginName> = {
	name: N;
	choosenBenefits: B[];
};

export type SerializedAcolyte = SerializedOrigin<SerializedOriginBenefitsAcolyte, OriginName.acolyte>;
export type SerializedAnimalsFriend = SerializedOrigin<SerializedOriginBenefitsAnimalsFriend, OriginName.animalsFriend> & {
	chosenAnimal: AnimalsFriendEquipments;
};

export type SerializedOrigins = SerializedAcolyte | SerializedAnimalsFriend;
