# handwebber-front

Repo frontend para handwebber

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

Place the component where you want and pass the property "arrayErrors" with an array that includes the errors to translate (you can save them in a state, for example):

```
<Error arrayErrors={errors} />
```
