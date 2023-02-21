# Azure Functions

## Http Request

For certain Azure Function bindings, I was unable to bind to both the model and a url path parameter. In order to fix this, I had to bind to the HttpRequest and have the url path parameters as normal parameters. In order to get the body from the HttpRequest, I wrote this extension method.

```cs
public static class HttpRequestExtensions
{
    public static T? DeserializeBody<T>(this HttpRequest req)
    {
        using var sr = new StreamReader(req.Body);
        using var reader = new JsonTextReader(sr);
        var serializer = new JsonSerializer();
        return serializer.Deserialize<T>(reader);
    }
}

```