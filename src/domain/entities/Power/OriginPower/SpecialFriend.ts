import type {AbilityEffectsInterface} from '../../Ability/AbilityEffects';
import {AbilityEffects} from '../../Ability/AbilityEffects';
import {OriginName} from '../../Origin/OriginName';
import {type SerializedSpecialFriend} from '../../Origin/SerializedOriginBenefit';
import {type SkillName} from '../../Skill/SkillName';
import {OriginPower} from './OriginPower';
import {OriginPowerName} from './OriginPowerName';
import {SpecialFriendEffect} from './SpecialFriendEffect';

export class SpecialFriend extends OriginPower<SerializedSpecialFriend> {
	static readonly powerName = OriginPowerName.specialFriend;
	source: OriginName = OriginName.animalsFriend;
	effects: AbilityEffectsInterface & {
		passive: {
			default: SpecialFriendEffect;
		};
	};

	constructor(skill: SkillName) {
		super(SpecialFriend.powerName);
		this.effects = new AbilityEffects({
			passive: {
				default: new SpecialFriendEffect(this.name, skill),
			},
		});
	}

	override serialize(): SerializedSpecialFriend {
		return {
			name: SpecialFriend.powerName,
			skill: this.effects.passive.default.skill,
			type: 'originPower',
		};
	}
}
