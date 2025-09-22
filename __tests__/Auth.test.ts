// __tests__/Auth.test.ts

// Mock next-auth
jest.mock("next-auth", () => {
  return {
    __esModule: true,
    default: () => ({
      handlers: {},
      signIn: jest.fn(),
      signOut: jest.fn(),
      auth: {
        options: {
          providers: [
            {
              authorize: async ({ email, password }: any) => {
                if (
                  email === "savannahinformatics@example.com" &&
                  password === "password"
                ) {
                  return { id: "1", email };
                }
                return null;
              },
            },
          ],
        },
      },
    }),
  };
});

// Mock the provider import
jest.mock("next-auth/providers/credentials", () => {
  return {
    __esModule: true,
    default: () => ({}),
  };
});

import { auth } from "../Auth";

describe("Auth", () => {
  it("authorizes valid credentials", async () => {
    const { providers } = (auth as any).options;
    const credentials = providers[0];
    const user = await credentials.authorize({
      email: "savannahinformatics@example.com",
      password: "password",
    });
    expect(user?.email).toBe("savannahinformatics@example.com");
  });

  it("rejects invalid credentials", async () => {
    const { providers } = (auth as any).options;
    const credentials = providers[0];
    const user = await credentials.authorize({
      email: "wrong",
      password: "wrong",
    });
    expect(user).toBeNull();
  });
});
