import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  CreateLink,
  InsertImage,
  imagePlugin,
  InsertTable,
  ListsToggle,
  BlockTypeSelect,
  listsPlugin,
  tablePlugin,
  quotePlugin,
  markdownShortcutPlugin,
  headingsPlugin,
} from "@mdxeditor/editor";
type Props = {
  markdown: string;
  setMarkdown: Function;
};
export default function NoteBlock({ markdown, setMarkdown }: Props) {
  return (
    <MDXEditor
      markdown={markdown}
      //@ts-ignore
      onChange={setMarkdown}
      plugins={[
        tablePlugin(),
        quotePlugin(),
        headingsPlugin(),
        markdownShortcutPlugin(),
        listsPlugin(),
        imagePlugin({}),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BlockTypeSelect />
              <InsertImage />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <InsertTable />
              <ListsToggle />
            </>
          ),
        }),
      ]}
    />
  );
}
