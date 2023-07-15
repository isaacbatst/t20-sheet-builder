import {AbilityEffects} from '../AbilityEffects';
import {RolePlayEffect} from '../RolePlayEffect';
import {RaceAbility} from '../../Race/RaceAbility';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {WildEmpathyRepeatedEffect} from './WildEmpathyRepeatedEffect';

export class WildEmpathy extends RaceAbility {
	static readonly effectDescription = 'Você pode se comunicar'
  + ' com animais por meio de linguagem corporal e vocalizações.'
  + ' Você pode usar Adestramento'
  + ' para mudar atitude e'
  + ' persuasão com animais (veja'
  + ' Diplomacia, na página'
  + ' 118).';

	override effects = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RaceAbilityName.wildEmpathy, WildEmpathy.effectDescription),
		},
		passive: {
			repeated: new WildEmpathyRepeatedEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.wildEmpathy);
	}
}
