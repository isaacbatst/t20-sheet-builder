import {type SerializedSheetEquipment} from '../Sheet';
import {type SerializedChurchMember, type SerializedOriginBenefit, type SerializedOriginPower, type SerializedOriginPowers, type SerializedSpecialFriend} from './OriginBenefit';
import {type OriginName} from './OriginName';

type OriginTypes<
	Name extends OriginName,
	OriginPower extends SerializedOriginPowers,
> = {
	origin: {
		name: Name;
		equipments: SerializedSheetEquipment[];
		chosenBenefits: Array<SerializedOriginBenefit<OriginPower>>;
	};
	benefits: SerializedOriginBenefit<OriginPower>;
	originPower: SerializedOriginPower<OriginPower>;
};

export type OriginMap = {
	acolyte: OriginTypes<OriginName.acolyte, SerializedChurchMember>;
	animalsFriend: OriginTypes<OriginName.animalsFriend, SerializedSpecialFriend>;
	amnesic: OriginTypes<OriginName.amnesic, SerializedChurchMember>;
	aristocrat: OriginTypes<OriginName.aristocrat, SerializedChurchMember>;
};
