import {ManaCost} from '../ManaCost';
import type {SpellCircle} from './SpellCircle';
import {circleManaCost} from './SpellCircleManaCost';

export class SpellCost extends ManaCost {
	constructor(circle: SpellCircle) {
		super(circleManaCost[circle]);
	}
}
