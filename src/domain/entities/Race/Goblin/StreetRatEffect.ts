import {PassiveEffect} from '../../Ability';
import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {SkillName} from '../../Skill';
import {RaceAbilityName} from '../RaceAbilityName';

export class StreetRatEffect extends PassiveEffect {
	override description: string = 'Você recebe +2 em'
  + ' Fortitude e sua recuperação de PV e PM nunca é'
  + ' inferior ao seu nível.';

	constructor() {
		super(RaceAbilityName.streetRat);
	}

	override apply(transaction: TransactionInterface): void {
		transaction.run(new AddFixedModifierToSkill({
			payload: {
				modifier: new FixedModifier(this.source, 2),
				skill: SkillName.fortitude,
			},
			transaction,
		}));
	}
}
