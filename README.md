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
