import {FruitsOfLabor} from '../../../Power/OriginPower/FruitsOfLabor/FruitsOfLabor';
import {type SerializedOrigins} from '../../SerializedOrigin';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryArtisan extends OriginBenefitFactory<SerializedOrigins['artisan']['originPower']> {
	makeOriginPower() {
		return new FruitsOfLabor();
	}
}
