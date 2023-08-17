import {describe, expect, it} from 'vitest';
import {BuildingSheet} from '../../Sheet';
import {SheetBuilder} from '../../Sheet/SheetBuilder';
import {Qareen} from './Qareen';
import {RaceAbilityName} from '../RaceAbilityName';
import {SpellName} from '../../Spell';

describe('Qareen', () => {
	let sheet: BuildingSheet;

	beforeEach(() => {
		sheet = new BuildingSheet();
		const qareen = new Qareen('water', SpellName.arcaneArmor);
		const builder = new SheetBuilder(sheet);
		builder.chooseRace(qareen);
	});

	it('should apply +2 to charisma, +1 to intelligence and -1 to wisdom', () => {
		const attributes = sheet.getSheetAttributes().getValues();
		expect(attributes.strength).toBe(0);
		expect(attributes.dexterity).toBe(0);
		expect(attributes.constitution).toBe(0);
		expect(attributes.intelligence).toBe(1);
		expect(attributes.wisdom).toBe(-1);
		expect(attributes.charisma).toBe(2);
	});

	it('should have desires hability', () => {
		const desires = sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.get(RaceAbilityName.desires);
		expect(desires).toBeDefined();
		expect(desires?.effects.roleplay.default.description).toBe('Se lançar uma magia que alguém tenha'
    + ' pedido desde seu último turno, o custo da magia'
    + ' diminui em –1 PM. Fazer um desejo ao qareen é uma'
    + ' ação livre.');
	});

	it('should have elemental resistance', () => {
		const elementalResistance = sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.get(RaceAbilityName.elementalResistance);

		expect(elementalResistance).toBeDefined();
		expect(elementalResistance?.effects.passive.default.description).toBe('Conforme sua'
    + ' ascendência, você recebe redução 10 a um tipo de'
    + ' dano. Escolha uma: frio (qareen da água), eletricidade'
    + ' (do ar), fogo (do fogo), ácido (da terra), luz (da'
    + ' luz) ou trevas (qareen das trevas).');

		const attributes = sheet.getSheetAttributes().getValues();
		expect(sheet.getSheetResistences().getResistances().cold?.getTotal(attributes)).toBe(10);
	});

	it('should have mystic tattoo', () => {
		const mysticTattoo = sheet
			.getSheetAbilities()
			.getRaceAbilities()
			.get(RaceAbilityName.mysticTattoo);

		expect(mysticTattoo).toBeDefined();
		expect(mysticTattoo?.effects.passive.default.description).toBe('Você'
    + ' pode lançar uma magia de 1º'
    + ' círculo a sua escolha (atributo-'
    + ' chave Carisma). Caso'
    + ' aprenda novamente essa'
    + ' magia, seu custo diminui'
    + ' em –1 PM.');
		expect(sheet.getSheetSpells().getSpells().get(SpellName.arcaneArmor)).toBeDefined();
	});
});
