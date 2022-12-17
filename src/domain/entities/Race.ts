import type {Attributes} from './Attributes';

export abstract class Race {
	abstract applyAttributesModifiers(attributes: Attributes): Attributes;
}
