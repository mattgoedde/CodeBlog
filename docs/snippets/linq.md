# LINQ


## Async Linq Methods
- AllAsync: True if every every element in the source returns True in the given Func
```dotnet 
/// <summary>
/// True if all Func return True
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="source"></param>
/// <param name="func"></param>
/// <returns>True if all Func return True</returns>
public static async Task<bool> AllAsync<T>(this IEnumerable<T> source, Func<T, Task<bool>> func)
{
    foreach (var element in source)
    {
        if (!await func(element))
            return false;
    }
    return true;
}
```
- AnyAsync: True if any every element in the source returns True in the given Func
```dotnet
/// <summary>
/// True if any Func returns True
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="source"></param>
/// <param name="func"></param>
/// <returns>True if any Func returns True</returns>
public static async Task<bool> AnyAsync<T>(this IEnumerable<T> source, Func<T, Task<bool>> func)
{
    foreach (var element in source)
    {
        if (await func(element))
            return true;
    }
    return false;
}
```