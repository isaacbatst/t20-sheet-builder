import type {PointsInterface} from '../Points';
import {Points} from '../Points';

export type LifePointsInterface = PointsInterface & {
	receiveDamage(value: number): void;
	heal(value: number): void;
};

export class LifePoints extends Points {
	receiveDamage(value: number) {
		this.current -= value;
	}

	heal(value: number) {
		this.current += value;
	}
}
