import {BlueBlood} from '../../../Power/OriginPower/BlueBlood';
import {type SerializedOrigins} from '../../SerializedOrigin';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAristocrat extends OriginBenefitFactory<SerializedOrigins['aristocrat']['originPower']> {
	makeOriginPower() {
		return new BlueBlood();
	}
}
