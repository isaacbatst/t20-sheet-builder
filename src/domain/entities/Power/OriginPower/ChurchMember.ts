import {AbilityEffects} from '../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../Ability/AbilityEffectsStatic';
import {type SerializedChurchMember, type SerializedOriginPower} from '../../Origin/OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../../Origin/OriginName';
import {ChurchMemberEffect} from './ChurchMemberEffect';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';

export class ChurchMember extends OriginPower<SerializedChurchMember> {
	static readonly powerName = OriginPowerName.churchMember;
	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: ChurchMemberEffect,
		},
	});

	source: OriginName = OriginName.acolyte;
	effects = new AbilityEffects({
		roleplay: {
			default: new ChurchMemberEffect(),
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
