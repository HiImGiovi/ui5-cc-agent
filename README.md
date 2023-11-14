# UI5-MIDDLEWARE-AGENT

# Install

Save the dependency in your ui5 project running the command :

```
npm install ui5-middleware-agent -D
```

## Usage

1. Define the dependency in `$yourapp/package.json`:

```json
"devDependencies": {
    // ...
    "ui5-middleware-agent": "*"
    // ...
},
"ui5": {
  "dependencies": [
    // ...
    "ui5-middleware-agent",
    // ...
  ]
}
```

> As the devDependencies are not recognized by the UI5 tooling, they need to be listed in the `ui5 > dependencies` array. In addition, once using the `ui5 > dependencies` array you need to list all UI5 tooling relevant dependencies.

2. configure it in `$yourapp/ui5.yaml`:

```yaml
server:
  customMiddleware:
    - name: ui5-middleware-agent
      afterMiddleware: compression
      configuration:
        proxy:
          host: <CLOUD CONNECTOR PROXY SERVER HOST> #example localhost
          port: <CLOUD CONNECTOR PROXY SERVER PORT> #example 20003
        connectivity:
          clientId: <CLIENT ID OF CONNECTIVITY SERVICE INSTANCE>
          clientSecret: <CLIENT SECRET OF CONNECTIVITY SERVICE INSTANCE>
          tokenURL: <TOKEN URL OF CONNECTIVITY SERVICE INSTANCE>
        backend:
          - path: <PATH TO PROXY> #example /sap/opu/odata/sap/
            target: <TARGET SERVER> #example targethost
            auth:
              username: <USERNAME TO AUTHENTICATE TO THE TARGET SYSTEM>
              password: <PASSWORD TO AUTHENTICATE TO THE TARGET SYSTEM>
```

## Use case
