# Publish ADORN on GitHub Pages

The revised site passed 69 browser checks on 20 October 2026. It is a static website and requires no build step, backend or API keys. Deployment target: [koushik2002/adorn](https://github.com/koushik2002/adorn). Website: [koushik2002.github.io/adorn/](https://koushik2002.github.io/adorn/).

## Upload and enable hosting

1. Use the public repository `koushik2002/adorn`. Public repositories support Pages on GitHub Free.
2. Extract `adorn-blinds-github-pages.zip`. Upload the extracted contents to the repository root and commit to `main`. Do not upload the ZIP itself or add an enclosing project folder.
3. Open **Settings → Pages**. Under **Build and deployment**, set **Source → Deploy from a branch**, **Branch → main**, and **Folder → /(root)**. Select **Save**.
4. Wait for the Pages deployment to succeed, then select **Visit site**. The URL will normally be `https://koushik2002.github.io/adorn/`.

The repository root must look like this:

```text
index.html
styles.css
theme.css
app.js
.nojekyll
assets/
docs/
README.md
```

`.nojekyll` is included in the ZIP. If a browser upload omits this hidden file, the plain HTML/CSS/JavaScript site also works through the default Jekyll publishing process.

## Check the public site

Open the live URL in a private browser window. Confirm the room photographs, local fonts, product filters, product dialogs and Light Studio load. Create and download a brief. On mobile, check the menu and the brief shortcut. Downloads do not send an enquiry or create a booking.

The local browser check already verified assets and product interactions at `/adorn-blinds-demo/`, matching a GitHub project Pages subdirectory. A live deployment check must follow actual publishing.

Official sources: [configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Verified 20 October 2026.
