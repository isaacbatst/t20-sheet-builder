import type {AffectableTargetCreature} from '../Affectable/AffectableTarget';
import type {Condition} from './Condition';

export class Stunned implements Condition {
	apply(affectable: AffectableTargetCreature): void {
		console.log('Stunned.apply not implemented');
	}
}
