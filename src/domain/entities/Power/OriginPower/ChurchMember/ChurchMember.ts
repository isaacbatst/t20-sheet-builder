import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {type SerializedOriginPowerBasic, type SerializedOriginPowers} from '../../../Origin/OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../../../Origin/OriginName';
import {OriginPower} from '.././OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {ChurchMemberEffect} from './ChurchMemberEffect';

export class ChurchMember extends OriginPower<SerializedOriginPowers['churchMember']> {
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

	override serialize(): SerializedOriginPowerBasic<OriginPowerName.churchMember> {
		return this.serializeBasic();
	}
}
