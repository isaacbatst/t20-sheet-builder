import {type SkillName} from '../../Skill';
import {ChurchMember} from './ChurchMember';
import {OriginPowerName} from './OriginPowerName';
import {type OriginPowerStatic} from './OriginPowerStatic';
import {SpecialFriend} from './SpecialFriend';

type OriginPowerFactoryParams = {
	power: OriginPowerName;
	specialFriendSkill?: SkillName;
};

export class OriginPowerFactory {
	public static make(params: OriginPowerFactoryParams) {
		if (params.power === OriginPowerName.churchMember) {
			return new ChurchMember();
		}

		if (params.power === OriginPowerName.specialFriend) {
			if (!params.specialFriendSkill) {
				throw new Error('MISSING_SPECIAL_FRIEND_SKILL');
			}

			return new SpecialFriend(params.specialFriendSkill);
		}
	}

	private static readonly map: Record<OriginPowerName, OriginPowerStatic> = {
		churchMember: ChurchMember,
		specialFriend: SpecialFriend,
	};
}
