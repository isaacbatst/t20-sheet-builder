import {type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {type SkillName} from '../../Skill';
import {type TranslatableName} from '../../Translator';
import {type OriginBenefits} from './OriginBenefits';
import {type SerializedOriginPower, type SerializedOriginBenefit} from './SerializedOriginBenefit';

export abstract class OriginBenefit<
	S extends SerializedOriginPower = SerializedOriginPower,
> {
	abstract name: SkillName | GeneralPowerName | OriginPowerName;
	abstract apply(transaction: TransactionInterface, source: TranslatableName): void;
	abstract validate(originBenefits: OriginBenefits): void;
	abstract serialize(): SerializedOriginBenefit<S>;
}
