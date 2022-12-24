import type {Appliable, SheetInterface} from './Sheet/SheetInterface';

export class ManaCost implements Appliable {
	constructor(readonly value: number) {}

	apply(sheet: SheetInterface): void {
		sheet.useMana(this.value);
	}
}
