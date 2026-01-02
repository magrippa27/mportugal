import type { Collection } from "tinacms";

export const BooksCollection: Collection = {
  name: "books",
  label: "Books",
  path: "src/content/books",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/books/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "string",
      required: true,
      options: [
        { label: "Radio", value: "radio" },
        { label: "Tobacco", value: "tobacco" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "publicationDate",
      label: "Publication Date",
      type: "datetime",
      required: true,
    },
    {
      name: "coverImage",
      label: "Cover Image",
      type: "image",
      required: true,
    },
    {
      name: "summary",
      label: "Summary",
      type: "string",
      ui: {
        component: "textarea",
      },
      required: true,
    },
    {
      name: "authorNote",
      label: "Author's Note",
      type: "string",
      ui: {
        component: "textarea",
      },
      required: true,
    },
    {
      name: "downloadUrl",
      label: "Download URL",
      type: "string",
    },
    {
      name: "language",
      label: "Language",
      type: "string",
      required: true,
      options: [
        { label: "English", value: "en" },
        { label: "Español", value: "es" },
        { label: "Português", value: "pt" },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

