import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import type {SheetInterface} from '../../SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class SlowAndAlways extends RaceAbility {
	constructor() {
		super(RaceAbilityName.slowAndAlways, 'passive');
	}

	apply(character: SheetInterface): void {
		character.dispatch(new ChangeDisplacement({
			displacement: 6,
			source: this.name,
		}));
	}
}
