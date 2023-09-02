import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
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
		const roleAbilities = transaction.sheet.getSheetAbilities().getRoleAbilities();

		if (raceAbilities.has(RaceAbilityName.wildEmpathy) || roleAbilities.has(RoleAbilityName.wildEmpathy)) {
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
