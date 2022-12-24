import type {Affectable, AffectableType} from '../Affectable/Affectable';
import type {AreaFormat} from '../Affectable/AffectableArea';
import type {TargetType} from '../Affectable/AffectableTarget';

export class EffectAffectable implements Affectable {
	constructor(
		readonly affectableType: AffectableType,
	) {}
}

export class EffectAffectableArea extends EffectAffectable {
	constructor(
		readonly format: AreaFormat,
	) {
		super('area');
	}
}

export class EffectAffectableTarget extends EffectAffectable {
	constructor(
		readonly targetType: TargetType,
		readonly quantity: number,
	) {
		super('target');

		if (quantity <= 0) {
			throw new Error('INVALID_TARGET_QUANTITY');
		}
	}
}
