import { defineConfig } from "tinacms";

// Ваша переменная для определения ветки
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Получаем clientId и token из переменных окружения
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Это значение будет доступно на клиенте
  token: process.env.TINA_TOKEN, // Это значение используется только на сервере

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // Это пример маршрутизатора. Вы можете удалить его, чтобы адаптировать под свой сайт
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
