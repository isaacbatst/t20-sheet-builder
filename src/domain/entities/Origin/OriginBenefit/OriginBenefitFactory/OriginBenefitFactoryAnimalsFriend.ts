import {SpecialFriend} from '../../../Power/OriginPower/SpecialFriend/SpecialFriend';
import {type SerializedOriginPowers} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAnimalsFriend extends OriginBenefitFactory<SerializedOriginPowers['specialFriend']> {
	protected override makeOriginPower(serialized: SerializedOriginPowers['specialFriend']): SpecialFriend {
		return new SpecialFriend(serialized.skill);
	}
}
