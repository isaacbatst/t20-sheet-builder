import type {Affectable, AffectableType} from './Affectable';
import type {AffectableTargetCreature} from './AffectableTarget';

export type AreaFormat = 'square' | 'circle' | 'cone';

export type AffectableAreaInterface = Affectable & {
	format: AreaFormat;
	getCreaturesInside(): AffectableTargetCreature[];
};

export abstract class AffectableArea implements AffectableAreaInterface {
	affectableType: AffectableType = 'area';

	constructor(
		readonly format: AreaFormat,
	) {}

	abstract getCreaturesInside(): AffectableTargetCreature[];
}
