import type {AbilityEffect} from '../../Ability/AbilityEffect';
import {RolePlayEffect} from '../../Ability/RolePlayEffect';
import {OriginName} from '../../Origin/OriginName';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';

export class ChurchMember extends OriginPower {
	static readonly effectDescription = 'Você consegue hospedagem confortável e informação'
  + 'em qualquer templo de sua divindade, para você e seus aliados.';

	source: OriginName = OriginName.acolyte;
	effects: Record<string, AbilityEffect> = {
		default: new RolePlayEffect(this.name, ChurchMember.effectDescription),
	};

	constructor() {
		super(OriginPowerName.churchMember);
	}
}
