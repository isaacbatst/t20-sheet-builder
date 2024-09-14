import {type SerializedSheetEquipment} from '../Sheet';
import {type AnimalsFriendEquipments} from './AnimalsFriend/AnimalsFriend';
import {type SerializedOriginBenefit, type SerializedOriginPower, type SerializedOriginPowers} from './OriginBenefit/SerializedOriginBenefit';
import {type OriginName} from './OriginName';

type SerializedOriginMeta<
	Name extends OriginName,
	OriginPower extends SerializedOriginPower,
	AdditionalData = {},
> = {
	origin: {
		name: Name;
		equipments: SerializedSheetEquipment[];
		chosenBenefits: Array<SerializedOriginBenefit<OriginPower>>;
	} & AdditionalData;
	benefits: SerializedOriginBenefit<OriginPower>;
	originPower: OriginPower;
};

export type SerializedOrigins = {
	acolyte: SerializedOriginMeta<OriginName.acolyte, SerializedOriginPowers['churchMember']>;
	animalsFriend: SerializedOriginMeta<OriginName.animalsFriend, SerializedOriginPowers['specialFriend'], {chosenAnimal: AnimalsFriendEquipments}>;
	amnesic: SerializedOriginMeta<OriginName.amnesic, SerializedOriginPowers['gradualMemories']>;
	aristocrat: SerializedOriginMeta<OriginName.aristocrat, SerializedOriginPowers['blueBlood']>;
	artisan: SerializedOriginMeta<OriginName.artisan, SerializedOriginPowers['fruitsOfLabor']>;
	artist: SerializedOriginMeta<OriginName.artist, SerializedOriginPowers['artisticDomain']>;
};

export type SerializedOriginTypes = SerializedOrigins[keyof SerializedOrigins];
export type SerializedOrigin = SerializedOriginTypes['origin'];
export type SerializedSheetOrigin<
	T extends SerializedOriginTypes['origin'] = SerializedOriginTypes['origin'],
> = T;
