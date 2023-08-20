import {AbilityEffects} from '../../Ability/AbilityEffects';
import {RolePlayEffect} from '../../Ability/RolePlayEffect';
import {type SerializedOriginPower, type SerializedChurchMember} from '../../Origin/OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../../Origin/OriginName';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';

export class ChurchMember extends OriginPower<SerializedChurchMember> {
	static readonly effectDescription = 'Você consegue hospedagem confortável e informação'
  + 'em qualquer templo de sua divindade, para você e seus aliados.';

	source: OriginName = OriginName.acolyte;
	effects = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(this.name, ChurchMember.effectDescription),
		},
	});

	constructor() {
		super(OriginPowerName.churchMember);
	}

	override serialize(): SerializedOriginPower<SerializedChurchMember> {
		return {
			name: OriginPowerName.churchMember,
			type: 'originPower',
			abilityType: 'power',
			effects: this.effects.serialize(),
		};
	}
}
