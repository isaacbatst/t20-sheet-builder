import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class DecreaseAttribute extends Action<'decreaseAttribute'> {
	constructor(
		params: ActionSubClassParams<'decreaseAttribute'>,
	) {
		super({
			...params,
			type: 'decreaseAttribute',
		});
	}

	override execute(): void {
		const sheetAttributes = this.transaction.sheet.getSheetAttributes();
		sheetAttributes.decreaseAttribute(this.payload.attribute, this.payload.quantity);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const attribute = Translator.getAttributeTranslation(this.payload.attribute);
		return `${source}: -${this.payload.quantity} em ${attribute}.`;
	}
}
