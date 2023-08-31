import {AbilityEffects, RolePlayEffect} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class HonourCode extends RoleAbility {
	static description = 'Cavaleiros distinguem-se'
  + ' de meros combatentes por seguir um código de conduta.'
  + ' Fazem isto para mostrar que estão acima dos'
  + ' mercenários e bandoleiros que infestam os campos'
  + ' de batalha. Você não pode atacar um oponente pelas'
  + ' costas (em termos de jogo, não pode se beneficiar do'
  + ' bônus de flanquear), caído, desprevenido ou incapaz'
  + ' de lutar. Se violar o código, você perde todos os seus'
  + ' PM e só pode recuperá-los a partir do próximo dia.'
  + ' Rebaixar-se ao nível dos covardes e desesperados'
  + ' abala a autoconfiança que eleva o cavaleiro.';

	override effects = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(this.name, HonourCode.description),
		},
	});

	constructor() {
		super(RoleAbilityName.honourCode);
	}
}
