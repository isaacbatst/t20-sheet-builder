import {SheetBuilderError} from '../errors';
import {Race} from './Race/Race';
import type {RaceName} from './Race/RaceName';
import type {Attribute, Attributes} from './Sheet/Attributes';

export abstract class SelectableAttributesRace extends Race {
	readonly attributeModifiers: Partial<Attributes> = {};

	constructor(
		readonly selectedAttributes: Attribute[],
		name: RaceName,
		initialAttributeModifiers?: Partial<Attributes>,
	) {
		super(name);
		this.validateSelectedAttributes(selectedAttributes);

		if (initialAttributeModifiers) {
			this.attributeModifiers = initialAttributeModifiers;
		}

		selectedAttributes.forEach(attribute => {
			this.attributeModifiers[attribute] = this.fixedModifier;
		});
	}

	private validateSelectedAttributes(attributes: Attribute[]) {
		if (attributes.length !== this.selectableQuantity) {
			throw new SheetBuilderError('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeAttributeRepeated = attributes
			.some((selectedAttribute, index) => attributes.indexOf(selectedAttribute) !== index);

		if (isSomeAttributeRepeated) {
			throw new SheetBuilderError('INVALID_ATTRIBUTES_SELECTION');
		}

		const isSomeSelectedAttributeRestricted = attributes
			.some(selectedAttribute => this.restrictedAttributes.includes(selectedAttribute));

		if (isSomeSelectedAttributeRestricted) {
			throw new SheetBuilderError('RESTRICTED_ATTRIBUTE');
		}
	}

	protected abstract get restrictedAttributes(): string[];
	protected abstract get selectableQuantity(): number;
	protected abstract get fixedModifier(): number;
}

