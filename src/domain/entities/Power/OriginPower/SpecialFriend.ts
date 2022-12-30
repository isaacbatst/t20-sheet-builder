import type {AbilityEffectsInterface} from '../../Ability/AbilityEffects';
import {AbilityEffects} from '../../Ability/AbilityEffects';
import {OriginName} from '../../Origin/OriginName';
import type {SkillName} from '../../Skill/SkillName';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriendEffect} from './SpecialFriendEffect';

export class SpecialFriend extends OriginPower {
	source: OriginName = OriginName.animalsFriend;
	effects: AbilityEffectsInterface;

	constructor(skill: SkillName) {
		super(OriginPowerName.specialFriend);
		this.effects = new AbilityEffects({
			passive: {
				default: new SpecialFriendEffect(this.name, skill),
			},
		});
	}
}
