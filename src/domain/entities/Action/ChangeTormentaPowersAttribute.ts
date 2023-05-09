import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeTormentaPowersAttribute extends Action<'changeTormentaPowersAttribute'> {
	constructor(params: ActionSubClassParams<'changeTormentaPowersAttribute'>) {
		super({
			...params,
			type: 'changeTormentaPowersAttribute',
		});
	}

	override execute(): void {
		const sheetAttributes = this.transaction.sheet.getSheetAttributes();
		sheetAttributes.changeTormentaPowersAttribute(this.payload.attribute);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const attribute = Translator.getAttributeTranslation(this.payload.attribute);
		return `${source}: agora você perde ${attribute} por poderes de tormenta.`;
	}
}
