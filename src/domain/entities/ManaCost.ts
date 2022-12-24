import type {Appliable, SheetInterface} from './SheetInterface';

export class ManaCost implements Appliable {
	constructor(readonly value: number) {}

	apply(sheet: SheetInterface): void {
		sheet.useMana(this.value);
	}
}
