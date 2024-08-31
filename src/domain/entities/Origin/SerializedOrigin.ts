import {type SerializedSheetEquipment} from '../Sheet';
import {type AnimalsFriendEquipments} from './AnimalsFriend/AnimalsFriend';
import {type SerializedOriginBenefit, type SerializedOriginBenefitsAcolyte, type SerializedOriginBenefitsAmnesic, type SerializedOriginBenefitsAnimalsFriend} from './OriginBenefit/SerializedOriginBenefit';
import {type OriginName} from './OriginName';

export type SerializedOriginBasic<B extends SerializedOriginBenefit = SerializedOriginBenefit, N extends OriginName = OriginName> = {
	name: N;
	equipments: SerializedSheetEquipment[];
	chosenBenefits: B[];
};

export type SerializedAcolyte = SerializedOriginBasic<SerializedOriginBenefitsAcolyte, OriginName.acolyte>;
export type SerializedAnimalsFriend = SerializedOriginBasic<SerializedOriginBenefitsAnimalsFriend, OriginName.animalsFriend> & {
	chosenAnimal: AnimalsFriendEquipments;
};
export type SerializedAmnesic = SerializedOriginBasic<SerializedOriginBenefitsAmnesic, OriginName.amnesic>;

export type SerializedOrigins =
  | SerializedAcolyte
  | SerializedAnimalsFriend
  | SerializedAmnesic;

export type SerializedSheetOrigin<T extends SerializedOrigins = SerializedOrigins> = T;
