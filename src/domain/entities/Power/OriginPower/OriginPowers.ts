import {ChurchMember} from './ChurchMember';
import {type OriginPowerName} from './OriginPowerName';
import {type OriginPowerStatic} from './OriginPowerStatic';
import {SpecialFriend} from './SpecialFriend';

export class OriginPowers {
	static readonly map: Record<OriginPowerName, OriginPowerStatic> = {
		churchMember: ChurchMember,
		specialFriend: SpecialFriend,
	};

	static getAll() {
		return Object.values(this.map);
	}
}
