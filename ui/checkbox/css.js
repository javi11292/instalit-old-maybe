import { vars } from "ui/theme";

export const container = {
  display: "flex",
  alignItems: "center",
};

export const check = {
  marginRight: "1rem",
  borderRadius: "0.2rem",
  border: `0.15rem solid ${vars.primary}`,
  background: vars.primary,
  color: vars.textInverse,
  transition: `all ${vars.transitionDuration}`,
};

export const unchecked = {
  background: "transparent",
  border: `0.15rem solid ${vars.backgroundSecondaryLight}`,
};

export const checkButton = {
  fontSize: "1.1rem",
  padding: 0,
};
