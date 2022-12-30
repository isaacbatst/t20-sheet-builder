import {TrainSkill} from '../../../Action/TrainSkill';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {SkillName} from '../../../Skill/SkillName';
import type {Dispatch} from '../../../Sheet/Transaction';
import type {Translatable} from '../../../Translator';
import {VersatileChoice} from './VersatileChoice';

export class VersatileChoiceSkill extends VersatileChoice {
	constructor(readonly skill: SkillName) {
		super(skill, 'skill');
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new TrainSkill({
			name: this.skill,
			source,
		}), sheet);
	}
}
