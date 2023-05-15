import {type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {type SkillName} from '../../Skill';
import {type TranslatableName} from '../../Translator';
import type {OriginBenefits} from '../Origin';

export abstract class OriginBenefit {
	abstract name: SkillName | GeneralPowerName | OriginPowerName;
	abstract apply(transaction: TransactionInterface, source: TranslatableName): void;
	abstract validate(originBenefits: OriginBenefits): void;
}
