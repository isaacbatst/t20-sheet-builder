import {type OriginPowerName, type OriginPower} from '../../../Power';
import {ChurchMember} from '../../../Power/OriginPower/ChurchMember/ChurchMember';
import {type SerializedOriginPowerBasic, type SerializedOriginPowers} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAcolyte extends OriginBenefitFactory<SerializedOriginPowers['churchMember']> {
	protected override makeOriginPower(serialized: SerializedOriginPowerBasic<OriginPowerName.churchMember>): OriginPower<SerializedOriginPowerBasic<OriginPowerName.churchMember>> {
		return new ChurchMember();
	}
}
