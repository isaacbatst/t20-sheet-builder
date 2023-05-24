import {type SerializedOriginBenefit} from './OriginBenefit/SerializedOriginBenefit';
import {type OriginName} from './OriginName';

export type SerializedOrigin<T extends SerializedOriginBenefit> = {
	name: OriginName;
	choosenBenefits: T[];
};
