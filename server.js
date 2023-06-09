const express = require("express");
const { createServer: createViteServer } = require("vite");
const path = require("path");

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Handle all routes with index.html
  app.get("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(
        url,
        '<div id="app"></div>'
      );
      const { render } = await vite.ssrLoadModule("/src/App.jsx");
      const appHtml = await render(url);

      const html = template.replace(
        '<div id="app"></div>',
        `<div id="app">${appHtml}</div>`
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.status(500).end(error.message);
    }
  });

  // Start the server
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

createServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
