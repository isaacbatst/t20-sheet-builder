import {Translatable} from '../Translatable';
import {Action, type ActionSubClassParams} from './Action';

export class ChangeGrantPowersCount extends Action<'changeGrantPowersCount'> {
	constructor(params: ActionSubClassParams<'changeGrantPowersCount'>) {
		super({
			...params,
			type: 'changeGrantPowersCount',
		});
	}

	override execute(): void {
		const sheetDevotion = this.transaction.sheet.getSheetDevotion();
		sheetDevotion.changeGrantedPowerCount(this.payload.count);
	}

	override getDescription(): string {
		const source = new Translatable(this.payload.source).getTranslation();
		return `${source}: quantidade de poderes concedidos por devoção é ${this.payload.count}.`;
	}
}
