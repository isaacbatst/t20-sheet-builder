import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {DodgeEffect} from './DodgeEffect';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerName} from '../../GeneralPowerName';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';

export class Dodge extends GeneralPower {
	static readonly powerName = GeneralPowerName.dodge;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			default: DodgeEffect,
		},
	});

	private static readonly requirement = new AttributeRequirement('dexterity', 1);

	override group: GeneralPowerGroup = GeneralPowerGroup.combat;

	effects = new AbilityEffects({
		passive: {
			default: new DodgeEffect(),
		},
	});

	constructor() {
		super(
			GeneralPowerName.dodge,
		);
		super.addRequirement(Dodge.requirement);
	}
}
