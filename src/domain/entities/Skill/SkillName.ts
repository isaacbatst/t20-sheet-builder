import {Name} from '../Name';

export enum SkillNameEnum {
	acrobatics = 'acrobatics',
	animalHandling = 'animalHandling',
	fight = 'fight',
	reflexes = 'reflexes',
	perception = 'perception',
	survival = 'survival',
}

export class SkillName extends Name<SkillNameEnum> {
	protected isValidName(name: string): name is SkillNameEnum {
		return name in SkillNameEnum;
	}

	protected getInvalidMessage(): string {
		return 'INVALID_SKILL_NAME';
	}
}
