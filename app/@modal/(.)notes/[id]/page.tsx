// app/@modal/(.)notes/[id]/page.tsx
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: Promise<{ id: string }>;
};
const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <>
      <Modal>
        <h2 className={css.header} >{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.date}>Created at: {new Date(note.createdAt).toLocaleString()}</p>
        <p className={css.date}>Updated at: {new Date(note.updatedAt).toLocaleString()}</p>
      </Modal>
    </>
  );
};

export default NotePreview;
