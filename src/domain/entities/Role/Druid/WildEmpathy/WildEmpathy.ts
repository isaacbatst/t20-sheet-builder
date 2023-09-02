import {AbilityEffects, RolePlayEffect} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class WildEmpathy extends RoleAbility {
	static description = 'Você pode se comunicar'
	+ ' com animais por meio de linguagem corporal e vocalizações.'
	+ ' Você pode usar Adestramento com animais'
	+ ' para mudar atitude e persuasão';

	override effects = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(this.name, WildEmpathy.description),
		},
	});

	constructor() {
		super(RoleAbilityName.wildEmpathy);
	}
}
