import {RolePlayEffect} from '../../../Ability';
import {OriginPowerName} from '../OriginPowerName';

export class ArtisticDomainDoublePayment extends RolePlayEffect {
	static get description() {
		return 'Recebe o dobro de tibares em apresentações.';
	}

	constructor() {
		super(OriginPowerName.artisticDomain, ArtisticDomainDoublePayment.description);
	}
}
