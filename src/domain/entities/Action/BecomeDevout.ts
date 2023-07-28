import {Action, type ActionSubClassParams} from './Action';

export class BecomeDevout extends Action<'becomeDevout'> {
	constructor(
		params: ActionSubClassParams<'becomeDevout'>,
	) {
		super({
			...params,
			type: 'becomeDevout',
		});
	}

	override execute(): void {
		const sheetDevotion = this.transaction.sheet.getSheetDevotion();
		sheetDevotion.becomeDevout(this.payload.deity, this.transaction);
	}

	override getDescription(): string {
		return `Tornou-se devoto de ${this.payload.deity.name}`;
	}
}
