# HttpClient Extensions

Extra extension methods for `HttpClient`

```csharp
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;

namespace RefineryCostReporting.IntegrationTests.Helpers;

/// <summary>
/// Extension methods adding additional functionality to HttpClient
/// </summary>
public static class HttpClientExtensions
{
    /// <summary>
    /// Send a POST request to the supplied URL with Form payload
    /// </summary>
    /// <typeparam name="TResponse">Type of Response expected</typeparam>
    /// <param name="client">The HttpClient used to send request</param>
    /// <param name="requestUri">The URI to send the request to</param>
    /// <param name="formDictionary">Payload of key value pairs</param>
    /// <param name="options">Optional. <see cref="JsonSerializerOptions"/> to configure deserializing the response</param>
    /// <param name="cancellationToken">Optional. <see cref="CancellationToken"/></param>
    /// <returns>Body content deserialized from JSON</returns>
    /// <exception cref="ArgumentNullException">Null or Empty request URI</exception>
    public static async Task<TResponse?> PostAsFormDataAsync<TResponse>(this HttpClient client, [StringSyntax(StringSyntaxAttribute.Uri)] string? requestUri, Dictionary<string, string> formDictionary, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(requestUri))
        {
            throw new ArgumentNullException(nameof(requestUri));
        }

        FormUrlEncodedContent formContent = new(formDictionary);
        
        HttpResponseMessage response = await client.PostAsync(requestUri, formContent, cancellationToken);

        string responseContentString = await response.Content.ReadAsStringAsync(cancellationToken);

        return JsonSerializer.Deserialize<TResponse>(responseContentString, options);
    }

    /// <summary>
    /// PostAsJsonAsync, but with a JSON response body
    /// </summary>
    /// <typeparam name="TValue">Type of payload to send</typeparam>
    /// <typeparam name="TResponse">Type of payload to receive</typeparam>
    /// <param name="client">The <see cref="HttpClient"/> to send the request</param>
    /// <param name="requestUri">The URI to send the request to</param>
    /// <param name="value">The payload to send the the request URI</param>
    /// <param name="options">Optional. <see cref="JsonSerializerOptions"/> to configure deserializing the response</param>
    /// <param name="cancellationToken">Optional. <see cref="CancellationToken"/></param>
    /// <returns>Body content deserialized from JSON</returns>
    /// <exception cref="ArgumentNullException"></exception>
    public static async Task<TResponse?> PostAsJsonAsync<TValue, TResponse>(this HttpClient client, [StringSyntax(StringSyntaxAttribute.Uri)] string? requestUri, TValue value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(requestUri))
        {
            throw new ArgumentNullException(nameof(requestUri));
        }

        HttpResponseMessage response = await client.PostAsJsonAsync(requestUri, value, options, cancellationToken: cancellationToken);

        string responseContentString = await response.Content.ReadAsStringAsync(cancellationToken);

        return JsonSerializer.Deserialize<TResponse>(responseContentString, options);
    }

    /// <summary>
    /// PostAsJsonAsync, but with a JSON response body
    /// </summary>
    /// <typeparam name="TValue">Type of payload to send</typeparam>
    /// <typeparam name="TResponse">Type of payload to receive</typeparam>
    /// <param name="client">The <see cref="HttpClient"/> to send the request</param>
    /// <param name="requestUri">The URI to send the request to</param>
    /// <param name="value">The payload to send the the request URI</param>
    /// <param name="options">Optional. <see cref="JsonSerializerOptions"/> to configure deserializing the response</param>
    /// <param name="cancellationToken">Optional. <see cref="CancellationToken"/></param>
    /// <returns>Body content deserialized from JSON</returns>
    /// <exception cref="ArgumentNullException"></exception>
    public static async Task<TResponse?> PostAsJsonAsync<TValue, TResponse>(this HttpClient client, Uri? requestUri, TValue value, JsonSerializerOptions? options = null, CancellationToken cancellationToken = default)
    {
        HttpResponseMessage response = await client.PostAsJsonAsync(requestUri, value, options, cancellationToken: cancellationToken);

        string responseContentString = await response.Content.ReadAsStringAsync(cancellationToken);

        return JsonSerializer.Deserialize<TResponse>(responseContentString, options);
    }
}
```