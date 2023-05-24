import {type SerializedOriginBenefit} from './OriginBenefit/SerializedOriginBenefit';
import {type OriginName} from './OriginName';

export type SerializedOrigin<T extends SerializedOriginBenefit = SerializedOriginBenefit> = {
	name: OriginName;
	choosenBenefits: T[];
};
