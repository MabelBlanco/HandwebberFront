# handwebber-front

Repo frontend para handwebber

## Instrucctions

### Dependencies

This app needs the backend API [handwebber-api](https://github.com/handwebber/handwebber-api.git) running.  
It is necessary run the email sender websocket which is included in the backend. See the _SEND EMAILS_ support in the backend documentation.

- Clone the **private** repo [handwebber-front](https://github.com/handwebber/handwebber-front.git).

### Running in development mode (local)

- Run `npm install`
- Prepare the .env configuration file:
  - Declare the _REACT_APP_API_BASE_URL_, indicating where the api backend is running. Example: `REACT_APP_API_BASE_URL=http://localhost:3000`
  - Declare the _REACT_APP_DOMAIN_URL_, which is the URL where is going to run this app. Example: `REACT_APP_DOMAIN_URL=http://localhost:3001`
  - Declare the _REACT_APP_CONF_SOCKET_URL_, which is the URL where the backend email sender is working. It works with socket.io, so, if you are running the microservice in the same url that the backend, you sould indicate the same URL. For example: `REACT_APP_CONF_SOCKET_URL=http://localhost:3001`
- Run `npm start`

# DEVELOPPERS NOTES

## Internationalization

To add internationalization:

At component's file, you must put:

```
import { useTranslation } from "react-i18next";
```

And inside the component:

```
const { t } = useTranslation();
```

"t" will be function "translate", that we use to translate. We aplicate this the next way:

```
{t("Component.phrase to translate")}
```

And now, we must add Component (if it's new) and phrase to files of translation (public/locales). Like this way:

```
  "Profile": {
    "Hello": "Hello",
    "Profile": "Profile",
    "Logout": "Logout"
  }
```

## ERROR COMPONENT

This component is used to translate the errors that you want to show to the user.

Just import Error Component at your component's file:

```
import { Error } from "../../commons/error/Error"
```

Place the component where you want, and pass the property "arrayErrors" with an array that includes the errors to translate (you can save them in a state, for example):

```
<Error arrayErrors={errors} />
```
