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
{t("phrase to translate")}
