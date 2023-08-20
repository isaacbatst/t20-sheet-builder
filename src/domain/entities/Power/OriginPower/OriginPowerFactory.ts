import {SheetBuilderError} from '../../../errors';
import {type SkillName} from '../../Skill';
import {ChurchMember} from './ChurchMember';
import {type OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';
import {type OriginPowerStatic} from './OriginPowerStatic';
import {SpecialFriend} from './SpecialFriend';

type OriginPowerFactoryParams = {
	power: OriginPowerName;
	specialFriendSkill?: SkillName;
};

export class OriginPowerFactory {
	public static make(params: OriginPowerFactoryParams): OriginPower {
		if (params.power === OriginPowerName.churchMember) {
			return new ChurchMember();
		}

		if (params.power === OriginPowerName.specialFriend) {
			if (!params.specialFriendSkill) {
				throw new SheetBuilderError('MISSING_SPECIAL_FRIEND_SKILL');
			}

			return new SpecialFriend(params.specialFriendSkill);
		}

		throw new SheetBuilderError('UNKNOWN_ORIGIN_POWER');
	}

	private static readonly map: Record<OriginPowerName, OriginPowerStatic> = {
		churchMember: ChurchMember,
		specialFriend: SpecialFriend,
	};
}
