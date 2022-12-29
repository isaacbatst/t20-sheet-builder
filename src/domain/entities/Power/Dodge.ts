import {DodgeEffect} from './DodgeEffect';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';
import {AttributeRequirement} from './Requirement/AttributeRequirement';

export class Dodge extends GeneralPower {
	private static readonly requirement = new AttributeRequirement('dexterity', 1);

	effects: {
		default: DodgeEffect;
	};

	constructor() {
		super(
			GeneralPowerName.dodge,
		);
		super.addRequirement(Dodge.requirement);
		this.effects = {
			default: new DodgeEffect(),
		};
	}
}
