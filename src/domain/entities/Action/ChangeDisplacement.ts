import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeDisplacement extends Action<'changeDisplacement'> {
	constructor(params: ActionSubClassParams<'changeDisplacement'>) {
		super({
			...params,
			type: 'changeDisplacement',
		});
	}

	override execute(): void {
		const sheetDisplacement = this.transaction.sheet.getSheetDisplacement();
		sheetDisplacement.changeDisplacement(this.payload.displacement);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		return `${source}: deslocamento alterado para ${this.payload.displacement}m.`;
	}
}
