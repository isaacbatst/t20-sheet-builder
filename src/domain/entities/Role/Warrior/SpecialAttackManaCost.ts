import {ManaCost} from '../../ManaCost';

export enum SpecialAttackEffectCosts {
	oneManaPoint = 1,
	twoManaPoints = 2,
}

export class SpecialAttackManaCost extends ManaCost {
	constructor(override value: SpecialAttackEffectCosts) {
		super(value);
	}
}
