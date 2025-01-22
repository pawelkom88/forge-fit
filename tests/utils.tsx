import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

interface RenderWithUserEventResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

export function customRender(
  ui: React.ReactNode,
  options?: Parameters<typeof render>[1],
): RenderWithUserEventResult {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, options),
  };
}
