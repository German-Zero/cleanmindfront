<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CleanMind backend knowledge context

The backend knowledge snapshot is stored at `.context/cleanmindapi/`.

Rules for frontend API work:

- Before creating or changing an API client, inspect `.context/cleanmindapi/backend-api-snapshot/` for the exact controller, request DTO, response model, and enum involved.
- Use `.context/cleanmindapi/graphify-out/graph.json` and `GRAPH_REPORT.md` to understand module ownership and cross-file relationships. Graph source paths are backend-relative and matching API files are mirrored under `backend-api-snapshot/`.
- Never invent request fields, response fields, enum values, routes, or HTTP methods. Request DTO validation is strict and rejects undeclared properties.
- Prefix backend routes with `/api`.
- Preserve authentication cookies on browser requests. When frontend and API use different origins, use credentials and confirm that backend CORS explicitly permits the frontend origin.
- Treat `null`, optional fields, dates, seconds, and minutes exactly as declared in the snapshot. Do not silently convert Pomodoro duration units.
- For Pomodoro, keep the visible countdown in the frontend, calculate remaining time from backend timestamps, and use the backend lifecycle endpoints as the persistent source of truth.
- If the snapshot and a live backend response disagree, stop and refresh the backend context before changing the frontend contract.
- Do not make commits or changes to production.