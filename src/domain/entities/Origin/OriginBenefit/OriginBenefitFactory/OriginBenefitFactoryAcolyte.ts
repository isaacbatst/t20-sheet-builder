import {type OriginPower} from '../../../Power';
import {ChurchMember} from '../../../Power/OriginPower/ChurchMember/ChurchMember';
import {type SerializedChurchMember} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAcolyte extends OriginBenefitFactory<SerializedChurchMember> {
	protected override makeOriginPower(serialized: SerializedChurchMember): OriginPower {
		return new ChurchMember();
	}
}
