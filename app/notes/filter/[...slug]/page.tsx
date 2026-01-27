// app/notes/filter/[...slug]/page.tsx
import css from "./page.module.css";
import axios from "axios";
import { NoteApiResponse } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type Props = {
  params: {
    slug: string[];
  };
};
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

const Notes = async ({params}: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const getNotes = async () => {
    const res = await axios.get<NoteApiResponse>("/notes");
    return res.data;
  };
  const currentQuery = {
    tag: tag,
    page: 1,
    perPage: 10,
  };
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", currentQuery],
      queryFn: getNotes,
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient params={tag}/>
      </HydrationBoundary>
    </div>
  );
};
export default Notes;
