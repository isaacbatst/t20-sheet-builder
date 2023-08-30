import {RoleAbilityName} from '../Role';
import {PreyMarkEffect} from '../Role/Ranger/PreyMark/PreyMarkEffect';
import {SheetActivateableEffects} from './SheetActivateableEffects';

describe('SheetActivatebleEffects', () => {
	it('should init with empty list', () => {
		const effects = new SheetActivateableEffects();
		expect(effects.getEffects()).toEqual(new Map());
	});

	it('should add effect', () => {
		const effects = new SheetActivateableEffects();
		const preyMarkEffect = new PreyMarkEffect();
		effects.register(preyMarkEffect);
		expect(effects.getEffects()).toEqual(new Map([
			[RoleAbilityName.preyMark, preyMarkEffect],
		]));
	});
});
