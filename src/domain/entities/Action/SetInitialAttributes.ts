import type {ActionPayload} from '../Sheet/SheetActions';
import {StringHelper} from '../StringHelper';
import {Action, type ActionSubClassParams} from './Action';

export class SetInitialAttributes extends Action<'setInitialAttributes'> {
	constructor(
		params: ActionSubClassParams<'setInitialAttributes'>,
	) {
		super({
			...params,
			type: 'setInitialAttributes',
		});
	}

	override execute(): void {
		const sheetAttributes = this.transaction.sheet.getSheetAttributes();
		sheetAttributes.setInitialAttributes(this.payload.attributes);
	}

	getDescription(): string {
		const attributesText = StringHelper.getAttributesText(this.payload.attributes);
		return `Atributos iniciais: ${attributesText}.`;
	}
}
