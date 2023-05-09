import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {TrainSkill} from '../../../../../../Action/TrainSkill';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {SkillName} from '../../../../../../Skill';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageFaerieCheatTrainingEffect extends PassiveEffect {
	constructor() {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new TrainSkill({
			payload: {
				skill: SkillName.cheat,
				source: this.source,
			},
			transaction,
		}));
	}
}
