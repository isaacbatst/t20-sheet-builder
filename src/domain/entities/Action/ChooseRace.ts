import {type BuildingSheet} from '../Sheet';
import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class ChooseRace extends Action<'chooseRace', BuildingSheet> {
	constructor(
		params: ActionSubClassParams<'chooseRace', BuildingSheet>,
	)	{
		super({
			...params,
			type: 'chooseRace',
		});
	}

	execute(): void {
		const sheetRace = this.transaction.sheet.getSheetRace();
		sheetRace.chooseRace(this.payload.race, this.transaction);
	}

	getDescription(): string {
		return `Raça escolhida: ${Translator.getRaceTranslation(this.payload.race.name)}.`;
	}
}
