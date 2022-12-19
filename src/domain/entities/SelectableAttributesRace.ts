import type {Attribute} from './Attributes';
import type {AttributeModifier} from './Race/Race';
import {Race} from './Race/Race';

export abstract class SelectableAttributesRace extends Race {
	readonly attributeModifiers: AttributeModifier[];

	constructor(attributes: Attribute[], name: string) {
		super(name);

		this.attributeModifiers = attributes.map<AttributeModifier>(attribute => ({
			attribute,
			modifier: this.fixedModifier,
		}));

		this.validateSelectedAttributes();
	}

	private validateSelectedAttributes() {
		if (this.attributeModifiers.length !== this.selectableQuantity) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeAttributeRepeated = this.attributeModifiers
			.some((selectedAttribute, index) => this.attributeModifiers
				.find((nestedSelectedAttribute, nestedIndex) =>
					nestedSelectedAttribute.attribute === selectedAttribute.attribute
					&& nestedIndex !== index,
				));

		if (isSomeAttributeRepeated) {
			throw new Error('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeSelectedAttributeRestricted = this.attributeModifiers
			.some(selectedAttribute => this.restrictedAttributes.includes(selectedAttribute.attribute));

		if (isSomeSelectedAttributeRestricted) {
			throw new Error('RESTRICTED_ATTRIBUTE');
		}
	}

	protected abstract get restrictedAttributes(): string[];
	protected abstract get selectableQuantity(): number;
	protected abstract get fixedModifier(): number;
}

