import {type Attribute, type Attributes} from './Attributes';
import {type SheetAttributesInterface} from './SheetAttributesInterface';

export class SheetAttributes implements SheetAttributesInterface {
	constructor(
		private attributes: Attributes = {
			charisma: 0,
			constitution: 0,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		},
		private tormentaPowersAttribute: Attribute = 'charisma',
	) {

	}

	setInitialAttributes(attributes: Attributes): void {
		this.attributes = attributes;
	}

	applyRaceModifiers(modifiers: Partial<Attributes>): void {
		const updatedAttributes: Partial<Attributes> = {};
		Object.entries(modifiers).forEach(([key, modifier]) => {
			const attribute = key as Attribute;
			updatedAttributes[attribute] = this.attributes[attribute] + modifier;
		});

		this.attributes = {
			...this.attributes,
			...updatedAttributes,
		};
	}

	changeTormentaPowersAttribute(attribute: keyof Attributes): void {
		this.tormentaPowersAttribute = attribute;
	}

	decreaseAttribute(attribute: keyof Attributes, quantity: number): void {
		this.attributes[attribute] -= quantity;
	}

	getTormentaPowersAttribute(): keyof Attributes {
		return this.tormentaPowersAttribute;
	}

	getValues(): Attributes {
		return this.attributes;
	}
}
