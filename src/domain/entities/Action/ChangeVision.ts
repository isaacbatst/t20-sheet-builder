import {Translatable} from '../Translatable';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeVision extends Action<'changeVision'> {
	constructor(params: ActionSubClassParams<'changeVision'>) {
		super({
			...params,
			type: 'changeVision',
		});
	}

	execute(): void {
		const sheetVision = this.transaction.sheet.getSheetVision();
		sheetVision.changeVision(this.payload.vision);
	}

	getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		const vision = Translator.getVisionTranslation(this.payload.vision);
		return `${source}: ${vision} recebida.`;
	}
}
