import type {ActionPayload} from '../Sheet/SheetActions';
import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class AddProficiency extends Action<'addProficiency'> {
	constructor(
		params: ActionSubClassParams<'addProficiency'>,
	) {
		super({
			...params,
			type: 'addProficiency',
		});
	}

	execute(): void {
		const sheetProficiencies = this.transaction.sheet.getSheetProficiencies();
		sheetProficiencies.addProficiency(this.payload.proficiency);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const proficiency = new Translatable(this.payload.proficiency);
		return `${source}: você é proficiente com ${proficiency.getTranslation()}.`;
	}
}
