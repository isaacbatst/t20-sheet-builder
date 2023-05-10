import {AbilityEffects, type AbilityEffectsInterface} from '../../../../../../Ability/AbilityEffects';
import {type AbilityLevel} from '../../../../../../Ability/AbilityLevel';
import {type Spell} from '../../../../../../Spell';
import {ArcanistLineage} from '../ArcanistLineage';
import {ArcanistLineageType} from '../ArcanistLineageType';
import {ArcanistLineageFaerieCheatTrainingEffect} from './ArcanistLineageFaerieCheatTrainingEffect';
import {ArcanistLineageFaerieExtraSpellEffect} from './ArcanistLineageFaerieExtraSpellEffect';

export class ArcanistLineageFaerie extends ArcanistLineage {
	override effects: Record<AbilityLevel, AbilityEffectsInterface> & {
		basic: {
			passive: {
				cheatTraining: ArcanistLineageFaerieCheatTrainingEffect;
				extraSpell: ArcanistLineageFaerieExtraSpellEffect;
			};
		};
	};

	override type: ArcanistLineageType = ArcanistLineageType.faerie;

	constructor(extraSpell: Spell) {
		super();
		this.effects = {
			basic: new AbilityEffects({
				passive: {
					cheatTraining: new ArcanistLineageFaerieCheatTrainingEffect(),
					extraSpell: new ArcanistLineageFaerieExtraSpellEffect(extraSpell),
				},
			}),
			enhanced: new AbilityEffects(),
			higher: new AbilityEffects(),
		};
	}
}
