import {SpecialFriend} from '../../../Power/OriginPower/SpecialFriend/SpecialFriend';
import {type SerializedSpecialFriend} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAnimalsFriend extends OriginBenefitFactory<SerializedSpecialFriend> {
	protected override makeOriginPower(serialized: SerializedSpecialFriend): SpecialFriend {
		return new SpecialFriend(serialized.skill);
	}
}
