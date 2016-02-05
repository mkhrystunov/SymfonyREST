rest_gallery
============

A Symfony project created on February 4, 2016, 8:15 pm.

# Installation

1. `composer install`
2. `php ./app/console doctrine:database:create`
2. `php ./app/console doctrine:schema:create`
3. `php ./app/console api:client:create`
4. `php ./app/console fos:user:create`

# Authorization

## Token request

`curl http://{host}/app_dev.php/oauth/v2/token -X POST -d '{ "grant_type": "password", "client_id": "1_{client_id}", "client_secret": "{client_secret}", "username": "{username}", "password": "{password}" }' -H "Content-Type: application/json"`


`{client_id}` and `{client_secret}` take from table `oauth2_clients`, `{username}` and `{password}` as you provided in user creation step

## Response

```json
{
  "access_token": "NGYyZDc1ZjIzYjhiZWI2NTNlNjIzNWQyYTJlNjQ2OGI4Njk5NWNkNTJjMDU3OTkxMWM2MDI1NTUxYjdmODU2ZQ",
  "expires_in": 3600,
  "token_type": "bearer",
  "scope": null,
  "refresh_token": "OTA5ZjQyY2Y4MzNkNmM5NDhhZWNlMmMxNWIwZjM5ZWU5ZjBhYjEyZTRkN2ZmNzQ2MDkyOWJmMGFlZWJkMDliNA"
}
```
