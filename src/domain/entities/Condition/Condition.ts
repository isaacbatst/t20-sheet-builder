import type {AffectableTargetCreature} from '../Affectable/AffectableTarget';

export type Condition = {
	apply(affectable: AffectableTargetCreature): void;
};
