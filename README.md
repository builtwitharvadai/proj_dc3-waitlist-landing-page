# Waitlist Landing Page

A lightweight, static waitlist landing page designed to capture early-access sign-ups with minimal infrastructure. Built with plain HTML, CSS, and JavaScript, it uses a third-party form handler (Formspree) for email submissions, giving you a production-ready single-page site without a backend.

## Features

- **Responsive Design** — Fluid layout that adapts from mobile (320px) through tablet and desktop breakpoints, using a mobile-first CSS approach.
- **Email Capture** — Formspree-backed submission with client-side validation, success confirmation state, and inline error messaging.
- **Animations** — Subtle scroll-triggered fade/slide animations, gradient background transitions, and micro-interactions on hover/focus states to reinforce brand identity.
- **Accessibility** — WCAG 2.1 AA compliant: semantic HTML landmarks, ARIA labels on interactive controls, keyboard navigation, visible focus rings, and color contrast ratios meeting AA standards.

## Deployment Instructions

The site is a fully static bundle — deploy it anywhere that serves flat files. The steps below cover **GitHub Pages**, the recommended zero-cost host.

1. **Push the repository to GitHub.**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: waitlist landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages.**
   - In the repository on GitHub, navigate to **Settings → Pages**.
   - Under **Build and deployment → Source**, select **Deploy from a branch**.
   - Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.

3. **Wait for the initial build.** GitHub typically publishes the site within 1–2 minutes. Your URL will be:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

4. **(Optional) Configure a custom domain.**
   - Add a `CNAME` file to the repository root containing your domain (e.g. `waitlist.example.com`).
   - In your DNS provider, add a `CNAME` record pointing your subdomain to `<your-username>.github.io`.
   - Back in **Settings → Pages**, enter the custom domain and enable **Enforce HTTPS**.

## Customization

All copy and styling live in `index.html` and `styles.css`. No build step is required — edit, save, refresh.

### Headline and Copy

Open `index.html` and locate the hero section:

```html
<section class="hero">
  <h1 class="hero__headline">Your headline here</h1>
  <p class="hero__subhead">A short, benefit-driven subhead.</p>
</section>
```

Update the `<h1>` and `<p>` text with your product's positioning.

### Colors

Brand colors are defined as CSS custom properties at the top of `styles.css`:

```css
:root {
  --color-primary: #6366f1;      /* indigo-500 */
  --color-primary-dark: #4f46e5; /* indigo-600 */
  --color-accent: #a855f7;       /* purple-500  */
  --color-bg: #0f172a;           /* slate-900   */
  --color-text: #f8fafc;         /* slate-50    */
}
```

Adjust these variables to re-theme the entire page — the gradient background, buttons, focus rings, and links all reference them.

### Typography and Spacing

Font family and modular scale are also declared in `:root`:

```css
:root {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
}
```

## Form Configuration

Email submissions are handled by [Formspree](https://formspree.io/) — no backend needed.

1. **Create a free Formspree account** at [https://formspree.io/register](https://formspree.io/register).
2. **Create a new form** from the Formspree dashboard and copy the endpoint URL (e.g. `https://formspree.io/f/xyzabcde`).
3. **Update `index.html`** — replace the placeholder `action` attribute on the form element:

   ```html
   <form
     class="waitlist-form"
     action="https://formspree.io/f/YOUR_FORM_ID"
     method="POST"
   >
     <input type="email" name="email" required />
     <button type="submit">Join Waitlist</button>
   </form>
   ```

4. **Verify your sender email** — Formspree emails you a confirmation link the first time a submission arrives.
5. **(Optional) Configure Formspree settings** from the dashboard:
   - Add a redirect URL for post-submission `_next` behavior.
   - Enable reCAPTCHA to filter spam.
   - Set up email/Slack notifications for new signups.

## Analytics Setup

Instrument the page to understand traffic sources and signup conversion. Pick either Google Analytics or Plausible — both integrate via a single snippet in `<head>`.

### Google Analytics 4

1. Create a GA4 property at [https://analytics.google.com/](https://analytics.google.com/) and copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
2. Paste the following into the `<head>` of `index.html`, replacing `G-XXXXXXXXXX`:

   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. **(Optional)** Track signup events by adding this to your form's submit handler in `script.js`:

   ```js
   gtag('event', 'waitlist_signup', {
     event_category: 'engagement',
     event_label: 'hero_form'
   });
   ```

### Plausible (privacy-friendly alternative)

1. Sign up at [https://plausible.io/](https://plausible.io/) and add your domain.
2. Add this single line to the `<head>` of `index.html`, replacing `yourdomain.com`:

   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

3. **(Optional)** Track custom goals by enabling the `script.tagged-events.js` variant and adding a `class="plausible-event-name=Signup"` attribute to your submit button.

## License

This project is released under the **MIT License**.

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
