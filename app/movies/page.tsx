// app/movies/page.tsx
import { auth } from "Auth";
import { redirect } from "next/navigation";
import MoviesClient from "./MoviesClient";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <MoviesClient searchParams={searchParams} />;
}
