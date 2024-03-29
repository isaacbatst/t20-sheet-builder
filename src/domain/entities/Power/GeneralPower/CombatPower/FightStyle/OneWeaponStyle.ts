import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';
import {type Character} from '../../../../Character';
import {CharacterAppliedFightStyle} from '../../../../Character/CharacterAppliedFightStyle';
import {type CharacterModifiers} from '../../../../Character/CharacterModifiers';
import {type Context} from '../../../../Context';
import {ContextualModifier} from '../../../../Modifier/ContextualModifier/ContextualModifier';
import {type ModifierCondition} from '../../../../Modifier/ContextualModifier/ContextualModifiersListInterface';
import {SkillName} from '../../../../Skill';
import {SkillRequirement} from '../../../Requirement/SkillRequirement';
import {GeneralPowerName} from '../../GeneralPowerName';
import {FightStyle} from './FightStyle';
import {OneWeaponStyleEffect} from './OneWeaponStyleEffect';

export class OneWeaponStyle extends FightStyle {
	static readonly powerName = GeneralPowerName.oneWeaponStyle;
	static readonly effects = new AbilityEffectsStatic({
		activateable: {
			default: OneWeaponStyleEffect,
		},
	});

	effects = new AbilityEffects({
		activateable: {
			default: new OneWeaponStyleEffect(),
		},
	});

	private readonly condition: ModifierCondition = {
		description: 'Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra,',
		verify(context: Context) {
			return context.sheet?.getSheetInventory().getWieldedItems().length === 1;
		},
	};

	constructor() {
		super(
			GeneralPowerName.oneWeaponStyle,
		);
		this.addRequirement(new SkillRequirement(SkillName.fight));
	}

	applyModifiers(modifiers: CharacterModifiers): CharacterAppliedFightStyle {
		const attackIndex = modifiers.attack.contextual.add(new ContextualModifier({
			source: GeneralPowerName.oneWeaponStyle,
			value: 2,
			condition: this.condition,
		},
		));

		const defenseIndex = modifiers.defense.contextual.add(new ContextualModifier({
			source: GeneralPowerName.oneWeaponStyle,
			value: 2,
			condition: this.condition,
		},
		));

		return new CharacterAppliedFightStyle(
			this,
			{
				attack: {
					contextual: [attackIndex],
				},
				defense: {
					contextual: [defenseIndex],
				},
			});
	}

	canActivate(character: Character): boolean {
		return character.getWieldedItems().length === 1;
	}
}
