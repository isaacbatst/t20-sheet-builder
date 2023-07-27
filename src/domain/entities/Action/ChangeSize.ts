import {Translator} from '../Translator';
import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeSize extends Action<'changeSize'> {
	constructor(params: ActionSubClassParams<'changeSize'>) {
		super({
			...params,
			type: 'changeSize',
		});
	}

	override execute(): void {
		const sheetSize = this.transaction.sheet.getSheetSize();
		sheetSize.changeSize(this.payload.size);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		return `${source}: tamanho alterado para ${Translator.getSizeTranslation(this.payload.size.name)}.`;
	}
}
