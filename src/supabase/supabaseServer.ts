// import { type CookieOptions, createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function supabaseServerClient() {
//   const cookieStore = cookies();

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           cookieStore.set({ name, value, ...options });
//         },
//         remove(name: string, options: CookieOptions) {
//           cookieStore.set({ name, value: "", ...options });
//         },
//       },
//     }
//   );

//   //   supabase.auth.getUser();

//   return supabase;
// }

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function supabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
