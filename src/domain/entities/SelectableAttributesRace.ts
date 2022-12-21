import type {Attribute, Attributes} from './Attributes';
import {Race} from './Race/Race';
import type {RaceName} from './Race/RaceName';

export abstract class SelectableAttributesRace extends Race {
	readonly attributeModifiers: Partial<Attributes> = {};

	constructor(selectedAttributes: Attribute[], name: RaceName) {
		super(name);
		this.validateSelectedAttributes(selectedAttributes);

		selectedAttributes.forEach(attribute => {
			this.attributeModifiers[attribute] = this.fixedModifier;
		});
	}

	private validateSelectedAttributes(attributes: Attribute[]) {
		if (attributes.length !== this.selectableQuantity) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeAttributeRepeated = attributes
			.some((selectedAttribute, index) => attributes.indexOf(selectedAttribute) !== index);

		if (isSomeAttributeRepeated) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeSelectedAttributeRestricted = attributes
			.some(selectedAttribute => this.restrictedAttributes.includes(selectedAttribute));

		if (isSomeSelectedAttributeRestricted) {
			throw new Error('RESTRICTED_ATTRIBUTE');
		}
	}

	protected abstract get restrictedAttributes(): string[];
	protected abstract get selectableQuantity(): number;
	protected abstract get fixedModifier(): number;
}

