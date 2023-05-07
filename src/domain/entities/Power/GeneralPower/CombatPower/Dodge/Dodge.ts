import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {DodgeEffect} from './DodgeEffect';
import {GeneralPower} from '../../GeneralPower';
import {GeneralPowerName} from '../../GeneralPowerName';
import {AttributeRequirement} from '../../../Requirement/AttributeRequirement';
import {GeneralPowerGroup} from '../../GeneralPowerGroup';

export class Dodge extends GeneralPower {
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
