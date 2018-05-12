import auth from "../auth";

import {
  authLogSuccess,
  authLogFailure,
  authRegSuccess,
  authRegFailure
} from "../../actions/auth";

describe("Auth reducer", () => {
  describe("action authLogSuccess", () => {
    it("change isAuthorized to true", () => {
      const next = auth({ isAuthorized: false }, authLogSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
  });

  describe("action authRegSuccess", () => {
    it("change isAuthorized to true", () => {
      const next = auth({ isAuthorized: false }, authRegSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
    it("clear logError", () => {
      const next = auth({ logError: "error" }, authRegSuccess());
      expect(next.logError).toBeNull();
    });
    it("clear regError field", () => {
      const next = auth(
        { regError: "error" },
        authRegSuccess()
      );
      expect(next.regError).toBeNull();
    });
  });

  describe("action authLogFailure", () => {
    it("fill logError", () => {
      const payload = "error";
      const next = auth({ logError: null }, authLogFailure(payload));
      expect(next.logError).toEqual(payload);
    });
  });

  describe("action authRegFailure", () => {
    it("fill regError", () => {
      const payload = "error";
      const next = auth(
        { regError: null },
        authRegFailure(payload)
      );
      expect(next.regError).toEqual(payload);
    });
  });
});
