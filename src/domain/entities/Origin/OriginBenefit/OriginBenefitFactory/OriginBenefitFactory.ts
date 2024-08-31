import {GeneralPowerFactory, type OriginPower} from '../../../Power';
import {type OriginBenefit} from '../OriginBenefit';
import {OriginBenefitGeneralPower} from '../OriginBenefitGeneralPower';
import {OriginBenefitOriginPower} from '../OriginBenefitOriginPower';
import {OriginBenefitSkill} from '../OriginBenefitSkill';
import {type SerializedOriginPower, type SerializedOriginPowers, type SerializedOriginBenefit} from '../SerializedOriginBenefit';

export abstract class OriginBenefitFactory<S extends SerializedOriginPowers> {
	makeFromSerialized(serialized: SerializedOriginBenefit<SerializedOriginPower<S>>): OriginBenefit<S> {
		if (serialized.type === 'generalPowers') {
			return new OriginBenefitGeneralPower(GeneralPowerFactory.make({name: serialized.name}));
		}

		if (serialized.type === 'skills') {
			return new OriginBenefitSkill(serialized.name);
		}

		const originPower = this.makeOriginPower(serialized);

		return new OriginBenefitOriginPower(originPower);
	}

	protected abstract makeOriginPower(serialized: S): OriginPower;
}

