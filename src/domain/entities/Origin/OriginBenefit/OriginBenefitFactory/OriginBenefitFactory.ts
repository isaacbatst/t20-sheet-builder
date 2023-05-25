export abstract class OriginBenefitFactory<S, B> {
	abstract makeFromSerialized(serialized: S): B;
}
