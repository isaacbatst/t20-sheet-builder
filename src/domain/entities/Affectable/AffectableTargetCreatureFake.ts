import {AffectableTargetCreature} from './AffectableTarget';

export class AffectableTargetCreatureFake extends AffectableTargetCreature {
	resisted = false;
	receiveDamage = jest.fn();
	setCondition = jest.fn();
	resist() {
		return this.resisted;
	}
}
