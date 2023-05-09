import {TrainSkill} from '../Action/TrainSkill';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SkillName} from '../Skill/SkillName';
import {type TranslatableName} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';

export class OriginBenefitSkill extends OriginBenefit {
	constructor(readonly skill: SkillName) {
		super();
	}

	apply(transaction: TransactionInterface, source: TranslatableName): void {
		transaction.run(new TrainSkill({
			payload: {
				skill: this.skill,
				source,
			},
			transaction,
		}));
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.skills.includes(this.skill)) {
			throw new SheetBuilderError('INVALID_ORIGIN_SKILL');
		}
	}
}
