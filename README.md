# ui5-cc-agent

Usefull middleware to use the SAP Cloud Connector in local configuration for a SAPUI5 app.

# Install

Save the dependency in your ui5 project running the command :

```
npm install ui5-cc-agent -D
```

## Usage

1. Define the dependency in `$yourapp/package.json`:

```json
"devDependencies": {
    // ...
    "ui5-cc-agent": "*"
    // ...
},
"ui5": {
  "dependencies": [
    // ...
    "ui5-cc-agent",
    // ...
  ]
}
```

> As the devDependencies are not recognized by the UI5 tooling, they need to be listed in the `ui5 > dependencies` array. In addition, once using the `ui5 > dependencies` array you need to list all UI5 tooling relevant dependencies.

2. configure it in `$yourapp/ui5.yaml`:

```yaml
server:
  customMiddleware:
    - name: ui5-cc-agent
      afterMiddleware: compression
      configuration:
        proxy:
          host: <CLOUD CONNECTOR PROXY SERVER HOST> #example localhost
          port: <CLOUD CONNECTOR PROXY SERVER PORT> #example 20003
        connectivity:
          clientId: <CLIENT ID OF CONNECTIVITY SERVICE INSTANCE>
          clientSecret: <CLIENT SECRET OF CONNECTIVITY SERVICE INSTANCE>
          tokenUrl: <TOKEN URL OF CONNECTIVITY SERVICE INSTANCE>
        backend:
          - path: <PATH TO PROXY> #example /sap/opu/odata/sap/
            target: <TARGET SERVER> #example targethost
            ccID: <CLOUD CONNECTOR LOCATION ID>
            auth:
              username: <USERNAME TO AUTHENTICATE TO THE TARGET SYSTEM>
              password: <PASSWORD TO AUTHENTICATE TO THE TARGET SYSTEM>
```

## Use case
