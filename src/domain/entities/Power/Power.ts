import {PowerName} from './PowerName';

export class Power {
	readonly name: PowerName;

	constructor(
		name: string,
		readonly description: string,
	) {
		this.name = new PowerName(name);
	}
}
