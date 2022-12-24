import {DodgeEffect} from './DodgeEffect';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';
import type {Requirement} from './Power';

export class Dodge extends GeneralPower {
	private static readonly requirement: Requirement = {
		description: 'Des 1',
		verify: sheet => sheet.getAttributes().dexterity >= 1,
	};

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
