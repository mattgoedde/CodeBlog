# Fluent Validations


## AutoMapper Mapped Validator

- Given a class `Foo` and another class `Bar`, who are related but do not inherit from a common parent, we can use [AutoMapper](https://automapper.org/) to convert from one to another. 
- When using [FluentValidations](https://docs.fluentvalidation.net/en/latest/#) to validate `Foo`, we may also want to validate `Bar`. 
- We need to either create a validator for `Bar` (which may be identical to the `Foo` validator), or first map `Bar` => `Foo` and then validate. 
- Using FluentValidation's `Transform()` method, we are able to abide by the DRY rule.

#### Two classes with no inherited relation
```cs
public class Foo
{
    string Name { get; set; }
}

public class Bar
{
    string Name { get; set; }
}
```
#### A validator for one of the classes
```cs
public class FooValidator : AbstractValidator<Foo>
{
    public FooValidator()
    {
        RuleFor(f => f.Name)
            .NotEmpty()
            .WithMessage("Name must not be empty");
    }
}
```
#### An AutoMapper Profile
```cs
public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Foo, Bar>().ReverseMap();
    }
}
```
#### A 'Mapped Validator'
```cs
public class MappedValidator<TSource, TDestination> : AbstractValidator<TSource>
{
    public MappedValidator(IMapper mapper, IValidator<TDestination> validator)
    {
        Transform(from: viewModel => viewModel, to: viewModel => mapper.Map<TSource, TDestination>(viewModel))
            .SetValidator(validator);
    }
}
```
#### Dependency Injection Container Configuration
```cs
    services
        .AddAutoMapper(typeof(AutoMapperProfile))
        .AddScoped<IValidator<Foo>, FooValidator>()
        .AddScoped<IValidator<Bar>, MappedValidator<Bar, Foo>>()

```
#### Usage
- Consumers may now inject either `IValidator<Foo>` or `IValidator<Bar>`.
- Either injection will use the rules from `FooValidator : AbstractValidator<Foo>` after mapping `Bar` => `Foo`