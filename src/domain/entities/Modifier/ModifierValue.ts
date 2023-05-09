import {StringHelper} from '../StringHelper';

export class ModifierValue {
	constructor(
		readonly number: number,
	) {}

	getValueWithSign(): string {
		return StringHelper.addNumberSign(this.number);
	}
}
