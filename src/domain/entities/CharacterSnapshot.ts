import type {Attributes} from './Attributes';

export class CharacterSnapshot {
	constructor(
		readonly description: string,
		readonly attributes: Attributes,
	) {
	}
}
