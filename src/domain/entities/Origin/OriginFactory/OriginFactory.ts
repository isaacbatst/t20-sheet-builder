import {GeneralPowerFactory, OriginPowerFactory, OriginPowerName, SpecialFriend} from '../../Power';
import {Acolyte} from '../Acolyte/Acolyte';
import {AnimalsFriend} from '../AnimalsFriend/AnimalsFriend';
import {OriginBenefitFactoryAcolyte} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryAcolyte';
import {OriginBenefitFactoryAnimalsFriend} from '../OriginBenefit/OriginBenefitFactory/OriginBenefitFactoryAnimalsFriend';
import {OriginBenefitGeneralPower} from '../OriginBenefit/OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefit/OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefit/OriginBenefitSkill';
import {type SerializedOriginBenefit} from '../OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export class OriginFactory {
	static makeFromSerialized(serialized: SerializedOrigins) {
		if (serialized.name === OriginName.acolyte) {
			const benefitFactory = new OriginBenefitFactoryAcolyte();
			const benefits = serialized.choosenBenefits.map(benefitFactory.makeFromSerialized);
			return new Acolyte(benefits);
		}

		if (serialized.name === OriginName.animalsFriend) {
			const benefitFactory = new OriginBenefitFactoryAnimalsFriend();
			const benefits = serialized.choosenBenefits.map(benefitFactory.makeFromSerialized);
			return new AnimalsFriend(benefits, serialized.chosenAnimal);
		}

		throw new Error('UNKNOWN_ORIGIN');
	}

	static makeBenefitsFromSerialized(serialized: SerializedOriginBenefit) {
		if (serialized.type === 'generalPowers') {
			return new OriginBenefitGeneralPower(GeneralPowerFactory.make({name: serialized.name}));
		}

		if (serialized.type === 'skills') {
			return new OriginBenefitSkill(serialized.name);
		}

		if (serialized.type === 'originPower') {
			if (serialized.name === OriginPowerName.specialFriend) {
				return new OriginBenefitOriginPower(new SpecialFriend(serialized.skill));
			}

			return new OriginBenefitOriginPower(OriginPowerFactory.make({power: serialized.name}));
		}

		throw new Error('UNKNOWN_ORIGIN_BENEFIT_TYPE');
	}
}
