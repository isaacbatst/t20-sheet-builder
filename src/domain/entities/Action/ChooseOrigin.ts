import {type BuildingSheet} from '../Sheet';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ChooseOrigin extends Action<'chooseOrigin', BuildingSheet> {
	constructor(
		params: ActionSubClassParams<'chooseOrigin', BuildingSheet>,
	) {
		super({
			...params,
			type: 'chooseOrigin',
		});
	}

	override execute(): void {
		const sheetOrigin = this.transaction.sheet.getSheetOrigin();
		sheetOrigin.chooseOrigin(this.payload.origin, this.transaction);
	}

	getDescription(): string {
		const origin = Translator.getOriginTranslation(this.payload.origin.name);
		return `Origem escolhida: ${origin}.`;
	}
}
