import {PassiveEffect} from '../../Ability';
import {AddFixedModifierToDefense} from '../../Action/AddFixedModifierToDefense';
import {FixedModifier} from '../../Modifier';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class StiffLeatherEffect extends PassiveEffect {
	override description = 'Sua pele é dura como a de um '
	+ 'touro. Você recebe +1 na Defesa.';

	constructor() {
		super(RaceAbilityName.stiffLeather);
	}

	override apply(transaction: TransactionInterface): void {
		const modifier = new FixedModifier(this.source, 1);
		transaction.run(new AddFixedModifierToDefense({payload: {modifier}, transaction}));
	}
}

