import type {Roller} from './Roller';

export class RollerFake implements Roller {
	result = 10;

	roll = jest.fn((quantity: number, sides: number): number => this.result);
}
