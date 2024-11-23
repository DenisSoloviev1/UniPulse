import React, { useState } from "react";
import {
  ToggleWrapper,
  ToggleChecker,
  TogglerLabel,
  CheckboxToggler,
  Line1,
  Line2,
  Line3,
} from "./style";

export const Toggler: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ToggleWrapper>
      <ToggleChecker
        id="toggleChecker"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <TogglerLabel htmlFor="toggleChecker">
        <CheckboxToggler>
          <Line1 isChecked={isChecked} />
          <Line2 isChecked={isChecked} />
          <Line3 isChecked={isChecked} />
        </CheckboxToggler>
      </TogglerLabel>
    </ToggleWrapper>
  );
};
