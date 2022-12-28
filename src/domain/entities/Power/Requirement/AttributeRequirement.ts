import type {Attribute} from '../../Attributes';
import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import {Translator} from '../../Translator';
import {Requirement} from './Requirement';

export class AttributeRequirement extends Requirement {
	readonly description: string;

	constructor(
		readonly attribute: Attribute,
		readonly value: number,
	) {
		super();
		this.description = this.getDescription();
	}

	verify(sheet: SheetBaseInterface): boolean {
		return sheet.getAttributes()[this.attribute] >= this.value;
	}

	protected getDescription(): string {
		return `${Translator.getAttributeTranslation(this.attribute)} ${this.value}`;
	}
}
