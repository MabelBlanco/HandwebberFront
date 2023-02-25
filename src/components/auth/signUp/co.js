=======
    <>
      <div className={styles.signup__page}>
        {error &&
          error.map((e) => (
            <p className={styles.signup__error} key={e}>
              {" "}
              {e}{" "}
            </p>
          ))}
        {!isLogged && (
          <form className={styles.signup__form} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              label={t("SignUp.username")}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.username}
            />

            <Input
              type="email"
              name="mail"
              label={t("SignUp.mail")}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.mail}
            />

            <Input
              type="password"
              name="password"
              label={t("SignUp.password") + " (min 8 characters)"}
              className={styles.signup__field}
              onChange={handleCredentials}
              value={credentials.password}
            />

            <Input
              type="password"
              name="passwordConfirm"
              label={t("SignUp.confirm password")}
              className={styles.signup__field}
              onChange={handleConfirmPassword}
              value={confirmPassword}
            />

            <InputFile
              name="image"
              id="image"
              label={t("SignUp.Upload picture")}
              className={styles.signup__field}
              onChange={handleImage}
            />

            <CheckBox
              name="check"
              label={t("SignUp.I accept the conditions")}
              onChange={handleCheck}
              checked={check}
            />
            <Button
              type="submit"
              className={styles.signup__submit}
              disabled={!isEnabledButton()}
            >
              {t("SignUp.SIGNUP")}
            </Button>
          </form>
        )}
        {isLogged && (
          <p>
            {t(
              "SignUp.Sorry, you are already registered. If you want register a new count, close this session first"
            )}
          </p>
        )}
>>>>>>> i18n