# Development Rules

## Data Fetching & Mutations

- Extract all TanStack Query mutations and queries into dedicated hook files
- Organize hooks by feature: `src/hooks/<feature>/use-<action>.ts`
- Route components should consume hooks, not define mutation/query logic inline
- Keep hook files focused — one hook per file

### Example structure

```
src/hooks/
├── auth/
│   ├── use-signup.ts
│   ├── use-login.ts
│   └── use-session.ts
├── rooms/
│   ├── use-create-room.ts
│   ├── use-rooms.ts
│   └── use-room.ts
└── assets/
    ├── use-upload-asset.ts
    └── use-assets.ts
```

### Hook pattern

```ts
// src/hooks/auth/use-signup.ts
import { useMutation } from "@tanstack/react-query";
import { signUp } from "~/lib/auth-client";

export function useSignup() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      signUp.email(data),
  });
}
```

## General

- Co-locate related code by feature, not by type
- Server functions and their types live close to usage
- No barrel files — import directly from the source file
