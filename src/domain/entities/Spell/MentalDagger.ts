import type {AbilityExecution, AbilityRange, AbilityDuration} from '../Ability/ActiveAbility';
import type {Affectable} from '../Ability/Affectable';
import type {SheetInterface} from '../SheetInterface';
import {Spell} from './Spell';
import {SpellCircle} from './SpellCircle';
import {SpellName} from './SpellName';

export class MentalDagger extends Spell {
	execution: AbilityExecution = 'default';
	range: AbilityRange = 'short';
	duration: AbilityDuration = 'immediate';
	affectable: Affectable = {type: 'target', value: 'creature'};

	constructor() {
		super(SpellName.mentalDagger, SpellCircle.first, 'arcane');
	}

	apply(sheet: SheetInterface): void {
		throw new Error('Method not implemented.');
	}
}
