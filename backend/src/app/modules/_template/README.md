# Backend module template

This directory is a **structure reference only**. It is not registered with FastAPI and must not
contain production behavior.

When adding a real capability, create a sibling module with a domain name such as `auth`, `users`,
`orders`, or `billing`. Do not place production code in `_template`.

```text
modules/<feature>/
├── __init__.py
├── router.py               # HTTP parsing, dependency wiring, response/status handling
├── schemas.py              # Pydantic request/response boundaries
├── service.py              # application and business behavior
├── repository.py           # persistence only when real storage exists
├── integration.py          # external-provider I/O only when required
└── models.py               # persistence models only when a database is selected
```

Rules:

- The dependency direction is `router -> service -> repository/integration`.
- Services do not depend on FastAPI request/response objects.
- Repositories and integrations do not import routers or services.
- Do not create optional files merely to make the tree look complete.
- Register a real feature router in `src/app/api/router.py`.
- Exercise the module through the focused quality gate and real HTTP behavior.
