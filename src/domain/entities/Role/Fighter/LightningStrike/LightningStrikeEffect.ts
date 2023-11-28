import {RolePlayEffect} from '../../../Ability';
import {RoleAbilityName} from '../../RoleAbilityName';

export class LightningStrikeEffect extends RolePlayEffect {
	static description = 'Quando usa a ação agredir para fazer um ataque desarmado,'
  + ' você pode gastar 1 PM para realizar um ataque desarmado adicional.';

	constructor() {
		super(RoleAbilityName.lightningStrike, LightningStrikeEffect.description);
	}
}
