import {OriginPower, OriginPowerName} from '..';
import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {type SerializedOriginPowers} from '../../../Origin';
import {OriginName} from '../../../Origin/OriginName';
import {ArtisticDomainActingBonus} from './ArtisticDomainActingBonus';
import {ArtisticDomainDoublePayment} from './ArtisticDomainDoublePayment';

export class ArtisticDomain extends OriginPower<SerializedOriginPowers['artisticDomain']> {
	static readonly powerName = OriginPowerName.artisticDomain;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			actingBonus: ArtisticDomainActingBonus,
		},
		roleplay: {
			doublePayment: ArtisticDomainDoublePayment,
		},
	});

	override source: OriginName = OriginName.artist;
	override effects = new AbilityEffects({
		passive: {
			actingBonus: new ArtisticDomainActingBonus(),
		},
		roleplay: {
			doublePayment: new ArtisticDomainDoublePayment(),
		},
	});

	constructor() {
		super(OriginPowerName.artisticDomain);
	}

	override serialize() {
		return this.serializeBasic();
	}
}
