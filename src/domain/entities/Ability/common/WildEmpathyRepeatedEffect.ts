import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {type TransactionInterface} from '../../Sheet/TransactionInterface';
import {SkillName} from '../../Skill';
import {PassiveEffect} from '../PassiveEffect';

export class WildEmpathyRepeatedEffect extends PassiveEffect {
	override description = 'Caso receba esta'
	+ ' habilidade novamente,'
	+ ' recebe +2 em'
	+ ' Adestramento.';

	constructor() {
		super(RaceAbilityName.wildEmpathy);
	}

	override apply(transaction: TransactionInterface): void {
		const raceAbilities = transaction.sheet.getSheetAbilities().getRaceAbilities();

		if (raceAbilities.has(RaceAbilityName.wildEmpathy)) {
			transaction.run(new AddFixedModifierToSkill({
				payload: {
					modifier: new FixedModifier(this.source, 2),
					skill: SkillName.animalHandling,
				},
				transaction,
			}));
		}
	}
}
