import {type SerializedOriginPowerBasic} from '..';
import {type OriginPowerName, type OriginPower} from '../../../Power';
import {GradualMemories} from '../../../Power/OriginPower/GradualMemories/GradualMemories';
import {type SerializedOrigins} from '../../SerializedOrigin';
import {OriginBenefitFactory} from './OriginBenefitFactory';

export class OriginBenefitFactoryAmnesic extends OriginBenefitFactory<SerializedOrigins['amnesic']['originPower']> {
	protected override makeOriginPower(serialized: SerializedOriginPowerBasic<OriginPowerName.gradualMemories>): OriginPower<SerializedOriginPowerBasic<OriginPowerName.gradualMemories>> {
		return new GradualMemories();
	}
}
