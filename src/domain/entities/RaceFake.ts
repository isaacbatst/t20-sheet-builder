import type {Attributes} from './Attributes';
import type {AttributeModifier} from './Race';
import type {RaceInterface} from './RaceInterface';

export class RaceFake implements RaceInterface {
	attributeModifiers: AttributeModifier[] = [];
	applyAbilities = jest.fn();
	applyAttributesModifiers = jest.fn((attributes: Attributes): Attributes => attributes);
}
