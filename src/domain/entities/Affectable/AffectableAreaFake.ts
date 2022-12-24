import {AffectableArea} from './AffectableArea';
import {AffectableTargetCreatureFake} from './AffectableTargetCreatureFake';

export class AffectableAreaFake extends AffectableArea {
	public creaturesInside: AffectableTargetCreatureFake[];
	constructor() {
		super('cone');
		const firstCreature = new AffectableTargetCreatureFake();
		const secondCreature = new AffectableTargetCreatureFake();
		secondCreature.resisted = true;
		this.creaturesInside = [firstCreature, secondCreature];
	}

	getCreaturesInside(): AffectableTargetCreatureFake[] {
		return this.creaturesInside;
	}
}
