export enum SkillNameEnum {
	acrobacia = 'acrobacia',
	adestramento = 'adestramento',
	luta = 'luta',
}

export class SkillName {
	static validateSkillName(name: string): name is SkillNameEnum {
		return name in SkillNameEnum;
	}

	readonly value: SkillNameEnum;

	constructor(name: string) {
		if (!SkillName.validateSkillName(name)) {
			throw new Error('INVALID_SKILL_NAME');
		}

		this.value = name;
	}
}
