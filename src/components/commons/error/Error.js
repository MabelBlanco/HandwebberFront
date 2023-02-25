import { useState } from "react";

export function Error({ arrayErrors }) {
  const [errors, setErrors] = useState(arrayErrors);

  if (!errors.length) {
    return "";
  } else {
    return (
      <div>
        {errors.map((error) => {
          return <p>{error}</p>;
        })}
      </div>
    );
  }
}
