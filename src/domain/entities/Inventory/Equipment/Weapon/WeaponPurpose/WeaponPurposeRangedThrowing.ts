import {WeaponPurposeRanged, type WeaponPurposeRangedParams} from './WeaponPurposeRanged';

export class WeaponPurposeRangedThrowing extends WeaponPurposeRanged {
	constructor(params: WeaponPurposeRangedParams) {
		super({
			...params,
			damageAttribute: params.damageAttribute ?? 'strength',
		});
	}
}
