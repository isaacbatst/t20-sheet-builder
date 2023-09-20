import type {Attribute} from '../../Sheet/Attributes';
import type {SheetInterface} from '../../Sheet/SheetInterface';
import {StringHelper} from '../../StringHelper';
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

	verify(sheet: SheetInterface): boolean {
		const attributes = sheet.getSheetAttributes().getValues();
		return attributes[this.attribute] >= this.value;
	}

	protected getDescription(): string {
		return `${Translator.getAttributeTranslation(this.attribute)} ${StringHelper.addNumberSign(this.value)}`;
	}
}
