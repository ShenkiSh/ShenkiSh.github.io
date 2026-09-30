# Frontend feature template

This directory is a **structure reference only**. It is never imported, routed, or shipped as a
product feature.

When adding a real feature, create a sibling directory with a domain name such as `auth`, `orders`,
`search`, or `billing`. Do not place production code in `_template`.

```text
features/<feature>/
├── api/                    # feature-owned HTTP request functions
├── components/             # feature-owned React components + colocated .module.scss
├── hooks/                  # feature-owned orchestration hooks
├── types.ts                # feature-owned public TypeScript types, only when needed
├── schemas.ts              # runtime boundary validation, only when needed
└── README.md               # optional notes for a complex feature
```

Rules:

- Route pages compose features; features do not import route pages or `app/`.
- Components call feature hooks or feature API functions, not raw `fetch` scattered through JSX.
- Reusable visual primitives belong in `src/components`, not inside a random feature.
- Generic transport/configuration helpers belong in `src/shared`.
- Every component or page stylesheet is a colocated `*.module.scss` file.
- Add only the folders and files the feature actually needs.
