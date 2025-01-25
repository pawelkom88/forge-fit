declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
    dismiss(
      subject: string,
      options?: Partial<TypeOptions>,
    ): Chainable<Element>;
    visit(
      originalFn: CommandOriginalFn<keyof Chainable>,
      url: string,
      options: Partial<VisitOptions>,
    ): Chainable<Element>;
    testById(id: string): Chainable<Element>;
  }
}
