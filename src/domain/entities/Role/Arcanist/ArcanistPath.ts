import type {Attribute} from '../../Attributes';
import {RoleAbility} from '../RoleAbility';
import {RoleAbilityName} from '../RoleAbilityName';

export enum ArcanistPathName {
	wizard = 'wizard',
	sorcerer = 'sorcerer',
	mage = 'mage',
}

export class ArcanistPath extends RoleAbility {
	static pathToAttribute: Record<ArcanistPathName, Attribute> = {
		mage: 'intelligence',
		sorcerer: 'charisma',
		wizard: 'intelligence',
	};

	static pathToLearnFrequency: Record<ArcanistPathName, 'all' | 'odd'> = {
		mage: 'all',
		sorcerer: 'odd',
		wizard: 'all',
	};

	constructor(readonly chosenPath: ArcanistPathName) {
		super(RoleAbilityName.arcanistPath, 'passive');
	}

	getPathAttribute() {
		return ArcanistPath.pathToAttribute[this.chosenPath];
	}

	getPathLearnFrequency() {
		return ArcanistPath.pathToLearnFrequency[this.chosenPath];
	}
}
