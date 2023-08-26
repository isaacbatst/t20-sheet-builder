# T20 SheetBuilder

Simulates the brazilian RPG: [Tormenta 20](https://jamboeditora.com.br/produto/tormenta20-edicao-jogo-do-ano-digital/).

## Installation

```sh
npm i t20-sheet-builder
```

## Quick start

To create a human warrior:

```ts
const sheetBuilder = new SheetBuilder();
const sheet = sheetBuilder
  .setInitialAttributes({strength: 2, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
  .chooseRace(new Human(
    ['charisma', 'constitution', 'dexterity'], 
    [new VersatileChoiceSkill(SkillName.acrobatics), new VersatileChoicePower(new OneWeaponStyle())] 
  ))
  .chooseRole(new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]))
  .chooseOrigin(new Acolyte([
    new OriginBenefitGeneralPower(new IronWill()), 
    new OriginBenefitSkill(SkillName.cure)]
  ))
  .trainIntelligenceSkills([])
  .addInitialEquipment({
    simpleWeapon: new Dagger(),
    armor: new LeatherArmor(),
    martialWeapon: new LongSword(),
    money: 24,
  })
  .build();
const character = new Character(sheet);
```
## API

### Content

Most content can be retrieved from a method like these:

```ts
Races.getAll() // [Human, Dwarf, Elf, ...]
Roles.getAll()
Origins.getAll()
Spells.getAll()
GeneralPowers.getAll()
Armors.getAll()
SimpleWeapons.getAll()
// etc
```

#### Content names

Some names can be retrieved despite the actual class:

```ts
const skill = SkillName.acrobatics;
const equipment = EquipmentName.leatherArmor;
const spell = SpellName.bless;
const generalPower = GeneralPowerName.ironWill;
// etc
```

### Sheet Builder

The `SheetBuilder` class is the main class of the library. It is used to create a character sheet.

It has the following methods:

```ts
type SheetBuilderInterface = {
	build(): CharacterSheet;
	reset(): SheetBuilder;
	addInitialEquipment(params: SheetBuilderInitialEquipmentParams): SheetBuilder;
	trainIntelligenceSkills(skills: SkillName[]): SheetBuilder;
	chooseOrigin(origin: OriginInterface): SheetBuilder;
	chooseRole(role: RoleInterface): SheetBuilder;
	chooseRace(race: RaceInterface): SheetBuilder;
};
```

Internally it uses an "incomplete" sheet class: `BuildingSheet`. Then after all mandatory choices are made, it builds a `CharacterSheet`.

### Character Sheet

This is the actual builded sheet with all information. But it is not a character yet.

### Character

This is the actual character. It receives a `CharacterSheet`, and has the following methods:

```ts
export type CharacterInterface = {
	modifiers: CharacterModifiers;
	sheet: CharacterSheetInterface;
	selectFightStyle(fightStyle: FightStyle): void;
	unselectFightStyle(): void;
	serialize(context: Context): SerializedCharacter;
	getAttributes(): Attributes;
	getAttacks(context: Context): Map<EquipmentName, CharacterAttack>;
	toggleEquipItem(name: EquipmentName): void;
	getWieldedItems(): EquipmentName[];
	getFightStyle(): CharacterAppliedFightStyle | undefined;
};
```

### CharacterAttack

Represents an attack of a character. It has the following methods:

```ts
export type CharacterAttack = {
	roll(): AttackResult 
	changeTestAttackAttribute(attribute: Attribute) // used for weapons that allow to change the used attribute
	
  // you can get the modifiers applied to the attack/damage
  modifiers: CharacterAttackModifiers

  // but also the final calculated values for them
  // theis values are calculated based on the context
  // max total is the maximum value if all conditions are met
  // total is the value for current character context
  getTestModifiersMaxTotal(): number
	getTestModifiersTotal(): number
	getDamageModifiersMaxTotal(): number
	getDamageModifiersTotal(): number
}
```

### AttackResult

Is the result of an attack roll. It has the following data:

```ts
export type AttackResult = {
	damage: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
		modifiersTotal: number;
	};
	test: {
		total: number;
		modifiers: Modifiers;
		rollResult: RollResult;
		modifiersTotal: number;
	};
	isCritical: boolean;
	isFumble: boolean;
};
```

### Context

The Context has information about the current situation of the character. It is used to calculate and apply `ContextualModifiers` to the character.

We have some predefined contexts:

- `OutOfGameContext`: disable all contextual modifiers
- `InGameContext`: enable all contextual modifiers for validation
- `PreviewContext`: enable contextual modifiers that are not "in game" (like "location")

### Races

Most races can be instantiated without parameters, but Human, Lefeu and Qareen need some input.

#### Human

Human receives choices for attributes and versatile choices.

Versatile choices can be either a skill or a power.

```ts
const attributes = ['charisma', 'constitution', 'dexterity'];
const versatileChoices = [
  new VersatileChoiceSkill(SkillName.acrobatics), 
  new VersatileChoicePower(new OneWeaponStyle())
]; 
const human = new Human(attributes, versatileChoices);
```

#### Lefeu

Lefeu receives choices for attributes and deformities.

```ts
const attributes = ['strength', 'constitution', 'dexterity'];
const lefeu = new Lefeu(attributes);
lefeu.addDeformities([SkillName.acrobatics, SkillName.animalHandling]);
```

#### Qareen

Qareen receives a `QareenType` and a spell for Mystic Tattoo.

```ts
const qareen = new Qareen('water', SpellName.arcaneArmor);
```