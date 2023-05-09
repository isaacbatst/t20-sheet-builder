import {StringHelper} from '../StringHelper';
import {Action, type ActionSubClassParams} from './Action';

export class ApplyRaceModifiers extends Action<'applyRaceModifiers'> {
	constructor(
		params: ActionSubClassParams<'applyRaceModifiers'>,
	) {
		super({
			...params,
			type: 'applyRaceModifiers',
		});
	}

	execute(): void {
		const sheetAttributes = this.transaction.sheet.getSheetAttributes();
		sheetAttributes.applyRaceModifiers(this.payload.modifiers);
	}

	getDescription(): string {
		const modifiersText = StringHelper.getAttributesText(this.payload.modifiers);
		return `Modificadores de raça aplicados: ${modifiersText}.`;
	}
}
