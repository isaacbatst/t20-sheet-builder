import type {PointsInterface} from '../Points';
import {Points} from '../Points';
import type {PointsMaxCalculator} from '../PointsMaxCalculator';

export type ManaPointsInterface = PointsInterface & {
	consume(value: number): void;
	restore(value: number, calculator: PointsMaxCalculator): void;
};

export class ManaPoints extends Points implements ManaPointsInterface {
	consume(value: number) {
		const finalValue = this.current - value;
		this.setCurrent(finalValue);
	}

	restore(value: number, calculator: PointsMaxCalculator): void {
		const finalValue = this.current + value;
		const max = this.getMax(calculator);
		this.setCurrent(Math.min(max, finalValue));
	}

	private setCurrent(value: number) {
		if (value < 0) {
			throw new Error('INVALID_NEGATIVE_MANA_BALANCE');
		}

		this.current = value;
	}
}
