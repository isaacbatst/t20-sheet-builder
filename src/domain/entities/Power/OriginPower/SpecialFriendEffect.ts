import {SheetBuilderError} from '../../Error/SheetBuilderError';
import type {AbilityName} from '../../Ability/Ability';
import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddFixedModifierToSkill} from '../../Action/AddFixedModifierToSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {OriginPowerName} from './OriginPowerName';

export class SpecialFriendEffect extends PassiveEffect {
	constructor(source: AbilityName, readonly skill: SkillName) {
		super(source);
		this.validateSkill();
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new AddFixedModifierToSkill({
			modifier: new FixedModifier(OriginPowerName.specialFriend, 5),
			skill: SkillName.animalHandling,
		}), sheet);

		dispatch(new AddFixedModifierToSkill({
			modifier: new FixedModifier(OriginPowerName.specialFriend, 2),
			skill: this.skill,
		}), sheet);
	}

	private validateSkill() {
		if (this.skill === SkillName.fight || this.skill === SkillName.aim) {
			throw new SheetBuilderError('INVALID_SKILL');
		}
	}
}
