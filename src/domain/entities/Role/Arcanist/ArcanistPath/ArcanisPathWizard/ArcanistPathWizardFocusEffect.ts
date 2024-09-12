import {RolePlayEffect} from '../../../../Ability';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistPathName} from '../ArcanistPath';
import {type ArcanistPathWizardFocus} from './ArcanistPathWizardFocus';

export class ArcanistPathWizardFocusEffect extends RolePlayEffect {
	static description = 'Você lança magias através de um foco — uma varinha, cajado, chapéu...';

	constructor() {
		super(RoleAbilityName.arcanistPath, ArcanistPathName.wizard);
	}
}
