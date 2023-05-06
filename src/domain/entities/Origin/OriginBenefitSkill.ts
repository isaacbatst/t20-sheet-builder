import {TrainSkill} from '../Action/TrainSkill';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Dispatch} from '../Sheet/Transaction';
import type {Translatable} from '../Translator';
import type {OriginBenefits} from './Origin';
import {OriginBenefit} from './OriginBenefit';
import {SheetBuilderError} from '../Error/SheetBuilderError';

export class OriginBenefitSkill extends OriginBenefit {
	constructor(readonly name: SkillName) {
		super();
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new TrainSkill({
			name: this.name,
			source,
		}), sheet);
	}

	validate(originBenefits: OriginBenefits): void {
		if (!originBenefits.skills.includes(this.name)) {
			throw new SheetBuilderError('INVALID_ORIGIN_SKILL');
		}
	}
}
