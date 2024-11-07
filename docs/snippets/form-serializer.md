# FormSerializer

A quick reflection based class to create a dictionary representing your object.

``` csharp
using System.Collections;
using System.Reflection;

namespace YourNamespace;

/// <summary>
/// A quick reflection based class to create a dictionary representing your object.
/// </summary>
public static class FormSerializer
{
    /// <summary>
    /// Serialize an object into a Dictionary which can be used to create <see cref="FormUrlEncodedContent"/>
    /// </summary>
    /// <typeparam name="TValue">Type of object to serialize</typeparam>
    /// <param name="value">Object to serialize</param>
    /// <returns>A Dictionary of key value pairs that can be used to create <see cref="FormUrlEncodedContent"/></returns>
    public static Dictionary<string, string> Serialize<TValue>(this TValue value) where TValue : class
    {
        return Serialize(typeof(TValue), value);
    }

    /// <summary>
    /// Serialize an object into a Dictionary which can be used to create <see cref="FormUrlEncodedContent"/>
    /// </summary>
    /// <param name="value">Type of object to serialize</param>
    /// <param name="value">Object to serialize</param>
    /// <returns>A Dictionary of key value pairs that can be used to create <see cref="FormUrlEncodedContent"/></returns>
    public static Dictionary<string, string> Serialize(Type? type, object? value)
    {
        // if the value itself is null, just return empty collection
        // or, if the type is null, return empty collection
        if (value is null || type is null)
        {
            return [];
        }

        Dictionary<string, string> dict = [];

        // if the type is any type of IEnumerable
        if (type.GetInterfaces().Contains(typeof(IEnumerable)))
        {
            // then iterate over each item in that collection and serialize it
            // add each property from that dictionary to our parent dictionary with an indexer
            int index = 0;
            IEnumerable? items = value as IEnumerable;
            foreach (object? item in items ?? Enumerable.Empty<object>())
            {
                Type? itemType = item?.GetType();

                Dictionary<string, string> itemValues = Serialize(itemType, item);

                foreach (KeyValuePair<string, string> complexPropertyValue in itemValues)
                {
                    dict.Add($"[{index}].{complexPropertyValue.Key}", complexPropertyValue.Value);
                }

                index++;
            }

            return dict;
        }

        foreach (PropertyInfo property in type?.GetProperties(BindingFlags.Instance | BindingFlags.Public) ?? [])
        {
            // just ignore null properties
            object? propertyValue = property.GetValue(value);
            if (propertyValue is null)
            {
                continue;
            }    
            
            // get the property type, or underlying type if it's a nullable type
            Type propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;

            // if property is a primitive
            if (propertyType == typeof(int) ||
                propertyType == typeof(long) ||
                propertyType == typeof(double) ||
                propertyType == typeof(string) ||
                propertyType == typeof(bool) ||
                propertyType == typeof(DateTime))
            {
                // then add its string value to the dictionary
                // if the string value is not null or empty
                string? propertyValueString = propertyValue.ToString();
                if (propertyValueString != null) // intentionall allow empty string, we just don't want null
                {
                    dict.Add(property.Name, propertyValueString);
                }

                continue;
            }
            
            // if the property is any type of IEnumerable
            if (propertyType.GetInterfaces().Contains(typeof(IEnumerable)))
            {
                // then iterate over each item in that collection and serialize it
                // add each property from that dictionary to our parent dictionary with an indexer
                int index = 0;
                IEnumerable? items = property.GetValue(value) as IEnumerable;
                foreach (object? item in items ?? Enumerable.Empty<object>())
                {
                    Type? itemType = item?.GetType();

                    Dictionary<string, string> itemValues = Serialize(itemType, item);

                    foreach (KeyValuePair<string, string> complexPropertyValue in itemValues)
                    {
                        dict.Add($"{property.Name}[{index}].{complexPropertyValue.Key}", complexPropertyValue.Value);
                    }

                    index++;
                }
                continue;
            }

            // if the property is a complex object then recursively serialize it and add its properties to parent dictionary
            Dictionary<string, string> complexPropertyValues = Serialize(propertyType, property.GetValue(value));
            foreach (KeyValuePair<string, string> complexPropertyValue in complexPropertyValues)
            {
                dict.Add($"[{property.Name}]{complexPropertyValue.Key}", complexPropertyValue.Value);
            }
        }

        // return the parent dictionary and filter out null values just in case
        return dict.Where(kvp => kvp.Value != null).ToDictionary();
    }
}
```