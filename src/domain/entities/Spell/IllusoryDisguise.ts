import type {AbilityExecution, AbilityRange, AbilityDuration} from '../Ability/ActiveAbility';
import type {Affectable} from '../Ability/Affectable';
import type {SheetInterface} from '../SheetInterface';
import {Spell} from './Spell';
import {SpellCircle} from './SpellCircle';
import {SpellName} from './SpellName';

export class IllusoryDisguise extends Spell {
	execution: AbilityExecution = 'default';
	range: AbilityRange = 'personal';
	duration: AbilityDuration = 'scene';
	affectable: Affectable = {type: 'target', value: 'self'};
	constructor() {
		super(SpellName.illusoryDisguise, SpellCircle.first, 'arcane');
	}

	apply(sheet: SheetInterface): void {
		throw new Error('Method not implemented.');
	}
}
