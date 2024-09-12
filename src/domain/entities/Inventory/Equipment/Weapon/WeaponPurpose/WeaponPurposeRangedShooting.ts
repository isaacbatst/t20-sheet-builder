import {WeaponPurposeRanged, type WeaponPurposeRangedParams} from './WeaponPurposeRanged';

export class WeaponPurposeRangedShooting extends WeaponPurposeRanged {
	constructor(params: WeaponPurposeRangedParams) {
		super({
			...params,
			damageAttribute: params.damageAttribute ?? undefined,
		});
	}
}
