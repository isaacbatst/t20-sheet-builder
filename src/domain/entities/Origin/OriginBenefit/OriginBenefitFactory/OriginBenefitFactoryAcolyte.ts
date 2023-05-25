import {GeneralPowerFactory, ChurchMember} from '../../../Power';
import {type OriginBenefit} from '../OriginBenefit';
import {OriginBenefitGeneralPower} from '../OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefitSkill';
import {type SerializedOriginBenefitsAcolyte} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAcolyte extends OriginBenefitFactory<
SerializedOriginBenefitsAcolyte,
OriginBenefit<SerializedOriginBenefitsAcolyte>
> {
	makeFromSerialized(serialized: SerializedOriginBenefitsAcolyte): OriginBenefit<SerializedOriginBenefitsAcolyte> {
		if (serialized.type === 'generalPowers') {
			return new OriginBenefitGeneralPower(GeneralPowerFactory.make({name: serialized.name}));
		}

		if (serialized.type === 'skills') {
			return new OriginBenefitSkill(serialized.name);
		}

		return new OriginBenefitOriginPower(new ChurchMember());
	}
}
