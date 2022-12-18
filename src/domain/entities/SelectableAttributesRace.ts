import type {Attribute, Attributes} from './Attributes';
import {Race} from './Race';

export abstract class SelectableAttributesRace extends Race {
	constructor(protected readonly selectedAttributes: Attribute[]) {
		super();

		this.validateSelectedAttributes();
	}

	applyAttributesModifiers(attributes: Attributes): Attributes {
		const modifiedAttributes: Partial<Attributes> = {};

		this.selectedAttributes.forEach(selectedAttribute => {
			modifiedAttributes[selectedAttribute] = attributes[selectedAttribute] + this.attributesModifier;
		});

		return {
			...attributes,
			...modifiedAttributes,
		};
	}

	private validateSelectedAttributes() {
		if (this.selectedAttributes.length !== this.selectableQuantity) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeAttributeRepeated = this.selectedAttributes
			.some((selectedAttribute, index) => this.selectedAttributes
				.find((nestedSelectedAttribute, nestedIndex) => nestedSelectedAttribute === selectedAttribute && nestedIndex !== index));

		if (isSomeAttributeRepeated) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeSelectedAttributeRestricted = this.selectedAttributes
			.some(selectedAttribute => this.restrictedAttributes.includes(selectedAttribute));

		if (isSomeSelectedAttributeRestricted) {
			throw new Error('RESTRICTED_ATTRIBUTE');
		}
	}

	protected abstract get restrictedAttributes(): string[];
	protected abstract get selectableQuantity(): number;
	protected abstract get attributesModifier(): number;
}

