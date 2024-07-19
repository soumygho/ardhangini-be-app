export abstract class BaseMapper<Source, Target> {
  public abstract mapFrom(source: Source): Target;
  public abstract mapTo(target: Target): Source;
}
