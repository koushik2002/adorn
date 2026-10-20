# Verification record

Verified 20 October 2026 in isolated headless Chrome profiles with desktop and mobile viewport emulation. **69 browser checks passed**, followed by a direct-file smoke check and clean screenshot review.

The verified journeys cover:

- A clear product offer, four product cards, collection filters, Room/Fabric switching, product details, Escape dismissal and product-to-studio selection.
- Style comparison opening from its link and staying inside the page on 390px and 320px screens. Its table scrolls within its own container.
- The photographic studio asset, four blind styles, curtain opening, colours, opening range, daylight presets and accessible scene descriptions. Blind overlays remain clipped to the photographed window.
- Optional reveal motion, visible content and negligible transitions when reduced motion is requested.
- Hero imagery selection and the three-question style finder, including back navigation, results and carrying room/style choices forward.
- Studio selections carried into the brief, required room/area validation, back navigation and invalid email rejection when an email is supplied.
- Successful brief creation with contact details and with both optional contact fields omitted. Saved colour, style, opening and daylight selections appear in the brief.
- Safe rendering of visitor notes, an actual downloaded text file, clipboard success/fallback feedback and clearing personal details on restart.
- Room inspiration selection, native FAQs, local images and local fonts.
- Page widths of 1440, 1024, 768, 390 and 320 CSS pixels. Horizontal overflow is checked against the document's client width. Mobile navigation, the brief shortcut and narrow-screen dialogs also pass.
- No uncaught JavaScript exceptions and no third-party network requests during the tested demo journey.
- All images and product interactions at the repository-style URL `/adorn-blinds-demo/`, as used by GitHub project Pages.

The direct-file smoke check confirmed that opening `index.html` without a server renders the collection and opens product details. Static validation found 59 unique HTML IDs with valid in-page links, label targets and local HTML asset paths. `.nojekyll` is present.

The visual review caught and corrected a mobile image panel width issue. Final screenshots were refreshed after the correction. The studio room is explicitly identified as AI-created and its blinds/daylight as illustrative.

Evidence: [browser check results](browser-checks.json), [desktop](desktop-preview.png), [mobile](mobile-preview.png), [studio](light-studio-preview.png), [mobile studio](mobile-studio-preview.png), [mobile collection](mobile-collection-preview.png), [fabric view](fabric-preview.png).

This record covers the local demo and a local repository-path simulation. Physical-device/Safari testing, enquiry delivery, a custom domain and a public GitHub Pages deployment have not been verified. The design brief downloads locally.
