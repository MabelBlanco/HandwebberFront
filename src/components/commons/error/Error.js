import { useState } from "react";

export function Error({ arrayErrors }) {
  const [errors, setErrors] = useState(arrayErrors);

  if (!errors.length) {
    return "";
  } else {
    return (
      <div>
        {errors.map((error, idx) => {
          return <p key={idx}>{error}</p>;
        })}
      </div>
    );
  }
}
