import type {SheetInterface} from '../../Sheet/SheetInterface';
import type {SkillName} from '../../Skill/SkillName';
import {Translator} from '../../Translator';
import {Requirement} from './Requirement';

export class SkillRequirement extends Requirement {
	readonly description: string;

	constructor(readonly skill: SkillName) {
		super();
		this.description = this.getDescription();
	}

	verify(sheet: SheetInterface): boolean {
		const skills = sheet.getSheetSkills().getSkills();
		return skills[this.skill].getIsTrained();
	}

	protected getDescription(): string {
		return `Treinado em ${Translator.getSkillTranslation(this.skill)}.`;
	}
}
