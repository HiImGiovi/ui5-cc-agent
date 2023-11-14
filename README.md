# ui5-cc-agent

Middleware to use the SAP Cloud Connector in local configuration for a SAPUI5 app. Look for the specific [example](#use-case-example) for more details.

## Install

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
          - path: <PATH REDIRECT> #example /sap/opu/odata/sap/
            target: <TARGET SERVER> #example targethost
            ccID: <CLOUD CONNECTOR LOCATION ID>
            auth:
              username: <USERNAME TO AUTHENTICATE TO THE TARGET SYSTEM>
              password: <PASSWORD TO AUTHENTICATE TO THE TARGET SYSTEM>
```

## Use case Example

Make sure that you can reach the cloud connector proxy server.
If you are on cloud foundry, and you have deployed an app bound to a connectivity service instance, open an SSH tunnel following these steps:

1. Enable your app for ssh with cf cli

```
cf enable-ssh <name of your app>
```

2. Restage your app to make the change effective

```
cf restage <name of your app>
```

3. Now open the ssh tunnel, so you can forward all the request on a specific port on your local host to the cloud connector proxy server which is reached only by the machine of your deployed app thanks to the connectivity service

```
cf ssh -L <LOCAL PORT TO FORWARD>:<CLOUD CONNECTOR PROXY SERVER HOST>:<CLOUD CONNECTOR PROXY SERVER PORT>
```

4. Follow the steps specified in [Usage](#usage) section and use this config in the ui5.yaml file

```yaml
server:
  customMiddleware:
    - name: ui5-cc-agent
      afterMiddleware: compression
      configuration:
        proxy:
          host: localhost #now we have the CC proxy running on our localhost after the SSH tunnel
          port: <LOCAL FORWARED PORT in STEP 3> #example 20003
        connectivity:
          clientId: <CLIENT ID OF CONNECTIVITY SERVICE INSTANCE>
          clientSecret: <CLIENT SECRET OF CONNECTIVITY SERVICE INSTANCE>
          tokenUrl: <TOKEN URL OF CONNECTIVITY SERVICE INSTANCE>
        backend:
          - path: <PATH REDIRECT> #example /sap/opu/odata/sap/
            target: <TARGET SERVER> # one of the virtual host added in the cloud connector
            ccID: <CLOUD CONNECTOR LOCATION ID>
            auth:
              username: <USERNAME TO AUTHENTICATE TO THE TARGET SYSTEM>
              password: <PASSWORD TO AUTHENTICATE TO THE TARGET SYSTEM>
```
