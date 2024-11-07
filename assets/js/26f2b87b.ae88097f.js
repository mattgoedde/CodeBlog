"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[522],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,f=u["".concat(l,".").concat(m)]||u[m]||y[m]||a;return n?r.createElement(f,o(o({ref:t},s),{},{components:n})):r.createElement(f,o({ref:t},s))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[u]="string"==typeof e?e:i,o[1]=p;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},371:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>y,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={},o="FormSerializer",p={unversionedId:"snippets/form-serializer",id:"snippets/form-serializer",title:"FormSerializer",description:"A quick reflection based class to create a dictionary representing your object.",source:"@site/docs/snippets/form-serializer.md",sourceDirName:"snippets",slug:"/snippets/form-serializer",permalink:"/docs/snippets/form-serializer",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Snippets",permalink:"/docs/category/snippets"},next:{title:"HttpClient Extensions",permalink:"/docs/snippets/httpclient-extensions"}},l={},c=[],s={toc:c},u="wrapper";function y(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"formserializer"},"FormSerializer"),(0,i.kt)("p",null,"A quick reflection based class to create a dictionary representing your object."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-csharp"},'using System.Collections;\nusing System.Reflection;\n\nnamespace YourNamespace;\n\n/// <summary>\n/// A quick reflection based class to create a dictionary representing your object.\n/// </summary>\npublic static class FormSerializer\n{\n    /// <summary>\n    /// Serialize an object into a Dictionary which can be used to create <see cref="FormUrlEncodedContent"/>\n    /// </summary>\n    /// <typeparam name="TValue">Type of object to serialize</typeparam>\n    /// <param name="value">Object to serialize</param>\n    /// <returns>A Dictionary of key value pairs that can be used to create <see cref="FormUrlEncodedContent"/></returns>\n    public static Dictionary<string, string> Serialize<TValue>(this TValue value) where TValue : class\n    {\n        return Serialize(typeof(TValue), value);\n    }\n\n    /// <summary>\n    /// Serialize an object into a Dictionary which can be used to create <see cref="FormUrlEncodedContent"/>\n    /// </summary>\n    /// <param name="value">Type of object to serialize</param>\n    /// <param name="value">Object to serialize</param>\n    /// <returns>A Dictionary of key value pairs that can be used to create <see cref="FormUrlEncodedContent"/></returns>\n    public static Dictionary<string, string> Serialize(Type? type, object? value)\n    {\n        // if the value itself is null, just return empty collection\n        // or, if the type is null, return empty collection\n        if (value is null || type is null)\n        {\n            return [];\n        }\n\n        Dictionary<string, string> dict = [];\n\n        // if the type is any type of IEnumerable\n        if (type.GetInterfaces().Contains(typeof(IEnumerable)))\n        {\n            // then iterate over each item in that collection and serialize it\n            // add each property from that dictionary to our parent dictionary with an indexer\n            int index = 0;\n            IEnumerable? items = value as IEnumerable;\n            foreach (object? item in items ?? Enumerable.Empty<object>())\n            {\n                Type? itemType = item?.GetType();\n\n                Dictionary<string, string> itemValues = Serialize(itemType, item);\n\n                foreach (KeyValuePair<string, string> complexPropertyValue in itemValues)\n                {\n                    dict.Add($"[{index}].{complexPropertyValue.Key}", complexPropertyValue.Value);\n                }\n\n                index++;\n            }\n\n            return dict;\n        }\n\n        foreach (PropertyInfo property in type?.GetProperties(BindingFlags.Instance | BindingFlags.Public) ?? [])\n        {\n            // just ignore null properties\n            object? propertyValue = property.GetValue(value);\n            if (propertyValue is null)\n            {\n                continue;\n            }    \n            \n            // get the property type, or underlying type if it\'s a nullable type\n            Type propertyType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;\n\n            // if property is a primitive\n            if (propertyType == typeof(int) ||\n                propertyType == typeof(long) ||\n                propertyType == typeof(double) ||\n                propertyType == typeof(string) ||\n                propertyType == typeof(bool) ||\n                propertyType == typeof(DateTime))\n            {\n                // then add its string value to the dictionary\n                // if the string value is not null or empty\n                string? propertyValueString = propertyValue.ToString();\n                if (propertyValueString != null) // intentionall allow empty string, we just don\'t want null\n                {\n                    dict.Add(property.Name, propertyValueString);\n                }\n\n                continue;\n            }\n            \n            // if the property is any type of IEnumerable\n            if (propertyType.GetInterfaces().Contains(typeof(IEnumerable)))\n            {\n                // then iterate over each item in that collection and serialize it\n                // add each property from that dictionary to our parent dictionary with an indexer\n                int index = 0;\n                IEnumerable? items = property.GetValue(value) as IEnumerable;\n                foreach (object? item in items ?? Enumerable.Empty<object>())\n                {\n                    Type? itemType = item?.GetType();\n\n                    Dictionary<string, string> itemValues = Serialize(itemType, item);\n\n                    foreach (KeyValuePair<string, string> complexPropertyValue in itemValues)\n                    {\n                        dict.Add($"{property.Name}[{index}].{complexPropertyValue.Key}", complexPropertyValue.Value);\n                    }\n\n                    index++;\n                }\n                continue;\n            }\n\n            // if the property is a complex object then recursively serialize it and add its properties to parent dictionary\n            Dictionary<string, string> complexPropertyValues = Serialize(propertyType, property.GetValue(value));\n            foreach (KeyValuePair<string, string> complexPropertyValue in complexPropertyValues)\n            {\n                dict.Add($"[{property.Name}]{complexPropertyValue.Key}", complexPropertyValue.Value);\n            }\n        }\n\n        // return the parent dictionary and filter out null values just in case\n        return dict.Where(kvp => kvp.Value != null).ToDictionary();\n    }\n}\n')))}y.isMDXComponent=!0}}]);