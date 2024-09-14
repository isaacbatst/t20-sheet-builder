import {type SerializedOriginPowerBasic} from '..';
import {type OriginPowerName, type OriginPower} from '../../../Power';
import {ArtisticDomain} from '../../../Power/OriginPower/ArtisticDomain/ArtisticDomain';
import {type SerializedOrigins} from '../../SerializedOrigin';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryArtist extends OriginBenefitFactory<SerializedOrigins['artist']['originPower']> {
	protected override makeOriginPower(serialized: SerializedOriginPowerBasic<OriginPowerName.artisticDomain>): OriginPower<SerializedOriginPowerBasic<OriginPowerName.artisticDomain>> {
		return new ArtisticDomain();
	}
}
