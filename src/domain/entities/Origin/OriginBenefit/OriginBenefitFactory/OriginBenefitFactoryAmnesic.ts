import {GradualMemories} from '../../../Power/OriginPower/GradualMemories/GradualMemories';
import {type SerializedGradualMemories} from '../SerializedOriginBenefit';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAmnesic extends OriginBenefitFactory<SerializedGradualMemories> {
	makeOriginPower() {
		return new GradualMemories();
	}
}
