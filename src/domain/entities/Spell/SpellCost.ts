import {ManaCost} from '../ManaCost';
import {Spell} from './Spell';
import type {SpellCircle} from './SpellCircle';

export class SpellCost extends ManaCost {
	constructor(circle: SpellCircle) {
		super(Spell.circleManaCost[circle]);
	}
}
