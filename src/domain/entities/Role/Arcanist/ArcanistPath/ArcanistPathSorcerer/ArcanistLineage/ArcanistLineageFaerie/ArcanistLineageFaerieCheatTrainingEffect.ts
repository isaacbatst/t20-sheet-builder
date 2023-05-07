import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {TrainSkill} from '../../../../../../Action/TrainSkill';
import {type SheetBaseInterface} from '../../../../../../Sheet/SheetBaseInterface';
import {type Dispatch} from '../../../../../../Sheet/Transaction';
import {SkillName} from '../../../../../../Skill';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageFaerieCheatTrainingEffect extends PassiveEffect {
	constructor() {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new TrainSkill({
			name: SkillName.cheat,
			source: this.source,
		}), sheet);
	}
}
