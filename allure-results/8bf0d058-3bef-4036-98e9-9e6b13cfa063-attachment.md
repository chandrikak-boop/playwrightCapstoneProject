# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Number of schema errors" [level=3] [ref=e2]
  - generic [ref=e3]: "1"
  - heading "Schema mismatches in data" [level=3] [ref=e4]
  - generic [ref=e5]: "{ \"id\": \"ff8081819782e69e019b7e223fee320a\", \"name\": \"my Apple MacBook Pro 16\", \"data\": { \"year\": 2019, \"price\": 1849.99, \"CPU model\": \"Intel Core i9\", \"Hard disk size\": \"1 TB\", \"color\": \" ⚠️ undefined Invalid input: expected string, received undefined\" } }"
  - heading "Schema errors" [level=3] [ref=e6]
  - list [ref=e7]:
    - listitem [ref=e8]: "{\"expected\":\"string\",\"code\":\"invalid_type\",\"path\":[\"data\",\"color\"],\"message\":\"Invalid input: expected string, received undefined\"}"
```