#!/bin/bash

az deployment group create --name ImperialAirlines --resource-group "rg-shared-imperialairlines" --template-uri https://raw.githubusercontent.com/francesco-sodano/imperial-airlines/main/arm-template/azuredeploy.json --parameters https://raw.githubusercontent.com/francesco-sodano/imperial-airlines/main/arm-template/azuredeploy.parameters.json