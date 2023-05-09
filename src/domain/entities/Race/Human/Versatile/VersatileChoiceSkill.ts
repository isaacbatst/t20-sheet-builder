import {TrainSkill} from '../../../Action/TrainSkill';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import type {SkillName} from '../../../Skill/SkillName';
import type {TranslatableName} from '../../../Translator';
import {VersatileChoice} from './VersatileChoice';

export class VersatileChoiceSkill extends VersatileChoice {
	constructor(readonly skill: SkillName) {
		super(skill, 'skill');
	}

	addToSheet(transaction: TransactionInterface, source: TranslatableName): void {
		transaction.run(new TrainSkill({
			payload: {
				skill: this.skill,
				source,
			},
			transaction,
		}));
	}
}
