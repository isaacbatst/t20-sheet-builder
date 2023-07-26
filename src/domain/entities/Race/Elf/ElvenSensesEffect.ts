import {PassiveEffect} from '../../Ability';
import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {ChangeVision} from '../../Action/ChangeVision';
import {FixedModifier} from '../../Modifier';
import {Vision} from '../../Sheet';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {SkillName} from '../../Skill';
import {RaceAbilityName} from '../RaceAbilityName';

export class ElvenSensesEffect extends PassiveEffect {
	override description = 'Você recebe visão penumbra e +2 em Misticismo e Percepção.';

	constructor() {
		super(RaceAbilityName.elvenSenses);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new ChangeVision({
			payload: {
				vision: Vision.penumbra,
				source: this.source,
			},
			transaction,
		}));

		const skillsModifier = new FixedModifier(this.source, 2);

		transaction.run(new AddFixedModifierToSkill({
			payload: {
				skill: SkillName.mysticism,
				modifier: skillsModifier,
			},
			transaction,
		}));

		transaction.run(new AddFixedModifierToSkill({
			payload: {
				skill: SkillName.perception,
				modifier: skillsModifier,
			},
			transaction,
		}));
	}
}
