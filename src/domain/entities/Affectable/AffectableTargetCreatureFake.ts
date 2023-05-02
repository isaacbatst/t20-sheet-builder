import {AffectableTargetCreature} from './AffectableTarget';
import {vi} from 'vitest';

export class AffectableTargetCreatureFake extends AffectableTargetCreature {
	resisted = false;
	receiveDamage = vi.fn();
	setCondition = vi.fn();
	resist() {
		return this.resisted;
	}
}
