import type {AbilityEffectsInterface} from '../../../Ability/AbilityEffects';
import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {type SerializedSpecialFriend} from '../../../Origin/OriginBenefit/SerializedOriginBenefit';
import {OriginName} from '../../../Origin/OriginName';
import {type SkillName} from '../../../Skill/SkillName';
import {OriginPower} from '../OriginPower';
import {OriginPowerName} from '../OriginPowerName';
import {SpecialFriendEffect} from './SpecialFriendEffect';

export class SpecialFriend extends OriginPower<SerializedSpecialFriend> {
	static readonly powerName = OriginPowerName.specialFriend;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			default: SpecialFriendEffect,
		},
	});

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

	override serializeSpecific(): SerializedSpecialFriend {
		return {
			name: SpecialFriend.powerName,
			skill: this.effects.passive.default.skill,
		};
	}
}
