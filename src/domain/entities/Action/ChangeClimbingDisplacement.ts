import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeClimbingDisplacement extends Action<'changeClimbingDisplacement'> {
	constructor(params: ActionSubClassParams<'changeClimbingDisplacement'>) {
		super({
			...params,
			type: 'changeClimbingDisplacement',
		});
	}

	override execute(): void {
		const sheetDisplacement = this.transaction.sheet.getSheetDisplacement();
		sheetDisplacement.changeClimbingDisplacement(this.payload.climbingDisplacement);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		return `${source}: deslocamento de escalada alterado para ${this.payload.climbingDisplacement}m.`;
	}
}
