import {RolePlayEffect} from '../../../Ability';
import {OriginPowerName} from '../OriginPowerName';

export class ChurchMemberEffect extends RolePlayEffect {
	static readonly description = 'Você consegue hospedagem confortável e informação'
  + 'em qualquer templo de sua divindade, para você e seus aliados.';

	constructor() {
		super(OriginPowerName.churchMember, ChurchMemberEffect.description);
	}
}
