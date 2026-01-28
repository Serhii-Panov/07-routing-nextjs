// app/notes/filter/[...slug]/page.tsx
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{slug: string[]}>;
};

const Notes = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const currentQuery = {
    tag: tag as
      | "Work"
      | "Personal"
      | "Meeting"
      | "Shopping"
      | "Todo"
      | undefined,
    page: 1,
    perPage: 10,
  };
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", currentQuery],
      queryFn: () => fetchNotes(currentQuery),
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient params={tag} />
      </HydrationBoundary>
    </div>
  );
};
export default Notes;
