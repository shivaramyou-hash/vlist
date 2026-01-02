import React from "react";
import { FormHelperText } from "@mui/material";

const UploadForm = ({ file, onChange, className, error }) => {
  return (
    <div>
      <input
        multiple
        type="file"
        onChange={onChange}
        className={className}
        // error={error}
        error={error ? "true" : ""}
      />
      {error && (
        <FormHelperText style={{ marginLeft: "20px", color: "#D63A90" }}>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};
export default UploadForm;
