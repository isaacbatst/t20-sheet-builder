import {OriginPowerName} from '../../Power/OriginPower/OriginPowerName';
import {type SerializedSheetEquipment} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {type OriginBenefit, type SerializedOriginBenefit, type SerializedOriginPowerBasic} from '../OriginBenefit';
import {OriginBenefitFactoryArtist} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryArtist';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export class Artist extends Origin<SerializedOrigins['artist']> {
	static readonly originName = OriginName.artist;
	static equipments = 'Estojo de disfarces ou um instrumento musical a sua escolha.';
	static skills: SkillName[] = [SkillName.acting, SkillName.cheat];
	static generalPowers = [];
	static originPower = OriginPowerName.artisticDomain;

	static fromSerialized(serialized: SerializedOrigins['artist']['origin']): Artist {
		const benefitsFactory = new OriginBenefitFactoryArtist();
		const benefits = serialized.chosenBenefits.map(benefitsFactory.makeFromSerialized);
		return new Artist(benefits);
	}

	constructor(chosenBenefits: Array<OriginBenefit<SerializedOrigins['artist']['originPower']>>) {
		super(
			OriginName.artist,
			chosenBenefits,
			{
				skills: Artist.skills,
				generalPowers: Artist.generalPowers,
				originPower: Artist.originPower,
			},
			[]);
	}

	override serialize(): {name: OriginName.artist; equipments: SerializedSheetEquipment[]; chosenBenefits: Array<SerializedOriginBenefit<SerializedOriginPowerBasic<OriginPowerName.artisticDomain>>>} {
		return {
			name: this.name,
			equipments: this.serializeEquipments(),
			chosenBenefits: this.serializeBenefits(),
		};
	}
}
