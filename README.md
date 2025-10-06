## Reflection

### Achieved Requirements 🎯

- Successfully implemented a **Next.js 15 App Router project** with dynamic routing for posts and comments.
- Integrated **Supabase PostgreSQL** for persistent data storage, including posts and comments tables with proper relationships.
- Created a **client-side `PostComponent`** to handle comment submission dynamically using server-side API routes.
- Applied a **minimalist design** with grey-scale colour palette, clean typography, and responsive layout.
- Configured **server-side rendering with dynamic pages** using `export const dynamic = "force-dynamic"` to ensure up-to-date data.
- Deployed the application successfully on **Vercel**, using environment variables and Supabase pooler for serverless database connections.

### Unachieved or Challenging Goals 🎯

- Encountered several deployment challenges due to **direct database connections failing in a serverless environment**, causing build errors (`ECONNREFUSED`, `ENETUNREACH`).
- Required learning and implementing **Supabase connection pooling** to solve serverless database connectivity issues.
- Did not implement **authentication or user management** yet, which could improve comment ownership and security.

### Reflection on the Process 🏹

**What went well:**

- Structuring the project using **App Router + client components** made dynamic updates easier.
- Styling with inline CSS for a minimalist aesthetic was straightforward and effective for the scope of the assignment.
- Debugging Vercel deployment logs and adjusting environment variables enhanced my understanding of serverless deployments.

**Challenges and solutions:**

- Deployment failed multiple times due to **database connection issues**, solved by switching from a direct connection URL to the **Supabase Pooler** URL.
- Prerendering errors required me to use `force-dynamic` for pages depending on live database content.

**External resources that helped:**

- Supabase documentation on **connection pooling** and Next.js **App Router guides**.
- YouTube tutorials for **Next.js 14/15 server-side rendering** and dynamic routing patterns.

**Future improvements:**

- Implement **user authentication** to allow editing/deleting own comments.
- Move inline styling to **CSS modules or Tailwind** for cleaner code and maintainability.
- Add **pagination or lazy loading** for comments to improve performance with larger datasets.
