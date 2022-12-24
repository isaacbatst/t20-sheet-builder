import type {AbilityEffect} from '../Ability/AbilityEffect';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';

export class TwoHandsStyle extends GeneralPower {
	effects: Record<string, AbilityEffect> = {};
	constructor() {
		super(
			GeneralPowerName.twoHandsStyle,
		);
	}
}
