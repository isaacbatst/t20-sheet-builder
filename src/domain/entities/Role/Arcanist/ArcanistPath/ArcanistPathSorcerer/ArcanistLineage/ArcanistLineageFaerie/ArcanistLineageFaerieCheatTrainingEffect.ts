import {PassiveEffect} from '../../../../../../Ability/PassiveEffect';
import {TrainSkill} from '../../../../../../Action/TrainSkill';
import {type TransactionInterface} from '../../../../../../Sheet/TransactionInterface';
import {SkillName} from '../../../../../../Skill';
import {RoleAbilityName} from '../../../../../RoleAbilityName';

export class ArcanistLineageFaerieCheatTrainingEffect extends PassiveEffect {
	get description() {
		return 'Você se torna treinado em Enganação';
	}

	constructor() {
		super(RoleAbilityName.arcanistSupernaturalLineage);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new TrainSkill({
			payload: {
				skill: SkillName.cheat,
				source: this.source,
			},
			transaction,
		}));
	}
}
