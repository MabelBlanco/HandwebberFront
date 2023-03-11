import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Error({ arrayErrors, ...props }) {
  const [errors, setErrors] = useState(arrayErrors);

  const { t } = useTranslation();

  useEffect(() => {
    setErrors(arrayErrors);
  }, [arrayErrors]);

  if (!errors.length) {
    return "";
  } else {
    return (
      <div>
        {errors.map((error) => {
          let errorTranslate;
          if (error === "Username must be alphanumeric") {
            errorTranslate = t("Error.Username must be alphanumeric");
          } else if (error === "Insert a valid mail please") {
            errorTranslate = t("Error.Insert a valid mail please");
          } else if (error === "Password min length 8 characters") {
            errorTranslate = t("Error.Password min length 8 characters");
          } else if (error === "ERROR in DB") {
            errorTranslate = t("Error.ERROR in DB");
          } else if (error === "User not found") {
            errorTranslate = t("Error.User not found");
          } else if (error === "Bad Request") {
            errorTranslate = t("Error.Bad Request");
          } else if (error === "User not in DB") {
            errorTranslate = t("Error.User not in DB");
          } else if (
            error === "Advertisements are not available in this moment"
          ) {
            errorTranslate = t(
              "Error.Advertisements are not available in this moment"
            );
          } else if (
            error === "Internal Error: Impossible create the advertisement"
          ) {
            errorTranslate = t(
              "Error.Internal Error: Impossible create the advertisement"
            );
          } else if (error === "Advertisement not in DB") {
            errorTranslate = t("Error.Advertisement not in DB");
          } else if (error === "This email do not have an account") {
            errorTranslate = t("Error.This email do not have an account");
          } else if (error === "Wrong password") {
            errorTranslate = t("Wrong password");
          } else if (error === "Internal Server Error") {
            errorTranslate = t("Error.Internal Server Error");
          } else if (error === "no jwtToken provided") {
            errorTranslate = t("Error.no jwtToken provided");
          } else if (error === "Invalid jwtToken") {
            errorTranslate = t("Error.Invalid jwtToken");
          } else if (error === "The file must be an image") {
            errorTranslate = t("Error.The file must be an image");
          } else if (error === "Network Error") {
            errorTranslate = t("Error.Network Error");
          } else if (error === "This username is not available") {
            errorTranslate = t("Error.This username is not available");
          } else if (error === "This email is already registered") {
            errorTranslate = t("Error.This email is already registered");
          } else if (error === "Passwords don't match") {
            errorTranslate = t("Error.Passwords don't match");
          } else if (error === "This is not the page you're looking for...") {
            errorTranslate = t(
              "Error.This is not the page you're looking for..."
            );
          } else {
            errorTranslate = error;
          }
          return (
            <p key={error} {...props}>
              {errorTranslate}
            </p>
          );
        })}
      </div>
    );
  }
}
