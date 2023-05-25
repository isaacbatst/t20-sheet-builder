import {GeneralPowerFactory, SpecialFriend} from '../../../Power';
import {type OriginBenefit} from '../OriginBenefit';
import {OriginBenefitGeneralPower} from '../OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefitSkill';
import {type SerializedOriginBenefitsAnimalsFriend} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAnimalsFriend extends OriginBenefitFactory<
SerializedOriginBenefitsAnimalsFriend,
OriginBenefit<SerializedOriginBenefitsAnimalsFriend>
> {
	makeFromSerialized(serialized: SerializedOriginBenefitsAnimalsFriend): OriginBenefit<SerializedOriginBenefitsAnimalsFriend> {
		if (serialized.type === 'generalPowers') {
			return new OriginBenefitGeneralPower(GeneralPowerFactory.make({name: serialized.name}));
		}

		if (serialized.type === 'skills') {
			return new OriginBenefitSkill(serialized.name);
		}

		return new OriginBenefitOriginPower(new SpecialFriend(serialized.skill));
	}
}
