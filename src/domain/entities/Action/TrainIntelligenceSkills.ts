import {Translator} from '../Translator';
import {Action, type ActionSubClassParams} from './Action';

export class TrainIntelligenceSkills extends Action<'trainIntelligenceSkills'> {
	constructor(
		params: ActionSubClassParams<'trainIntelligenceSkills'>,
	) {
		super({
			...params,
			type: 'trainIntelligenceSkills',
		});
	}

	override execute(): void {
		const sheetSkills = this.transaction.sheet.getSheetSkills();
		sheetSkills.trainIntelligenceSkills(this.payload.skills);
	}

	getDescription(): string {
		const {skills} = this.payload;
		const trainedSkills = skills.map(skill => Translator.getSkillTranslation(skill)).join(', ');
		return skills.length
			? `Perícias treinadas pela inteligência: ${trainedSkills}.`
			: 'Nenhuma perícia treinada pela inteligência.';
	}
}
