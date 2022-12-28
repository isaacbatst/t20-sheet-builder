import type {AbilityEffect} from '../../Ability/AbilityEffect';
import {OriginName} from '../../Origin/OriginName';
import type {SkillName} from '../../Skill/SkillName';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriendEffect} from './SpecialFriendEffect';

export class SpecialFriend extends OriginPower {
	source: OriginName = OriginName.animalsFriend;
	effects: Record<string, AbilityEffect>;

	constructor(skill: SkillName) {
		super(OriginPowerName.specialFriend);
		this.effects = {
			default: new SpecialFriendEffect(this.name, skill),
		};
	}
}
