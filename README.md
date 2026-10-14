# Laiba Batool Portfolio

Plain HTML, CSS and JavaScript. No build step.

## Run
Open `index.html` in a browser, or serve the folder: `python -m http.server 8000` then visit http://localhost:8000

## Edit your details
All editable data is at the top of `js/script.js`: `CONFIG` (email, GitHub, LinkedIn, form endpoint), `ROLES`, `SKILLS`, `PROJECTS`.

## Add your photo and CV
- Photo: save as `assets/images/profile.jpg` (square, about 800x800, under 200 KB). Until then an illustrated placeholder avatar (`profile-placeholder.svg`) shows.
- CV: a starter CV made from your portfolio details is already at `assets/files/Laiba-Batool-CV.pdf`, so the Resume buttons work. Replace it with your own CV using the same file name.

## Projects
Put screenshots in `assets/images/` using the names in `PROJECTS` (about 1280x720: project-kb-authentics.jpg, project-auction.jpg, project-currency-converter.jpg, project-pixel-pakistan.jpg). In each project set `demo` and `source` to real URLs; empty values hide the button.

## Contact form
A static page cannot send email by itself, so it uses a free form service. Easiest: **Web3Forms**.
1. Go to https://web3forms.com, enter laibasyed993@gmail.com and get your Access Key by email.
2. Paste it in `js/script.js` at `web3formsKey: ""`. No activation step. Messages then arrive in your inbox.
If `web3formsKey` is empty, the form uses FormSubmit instead (needs a one-time activation email). Never put secret API keys in this code; a Web3Forms access key is designed to be public.

## Testing checklist
- [ ] Layout at 360, 768, 1024, 1440 px with no sideways scrolling
- [ ] Menu opens/closes and closes after choosing a link; Esc closes it
- [ ] Active nav link follows scrolling; back-to-top appears after scrolling
- [ ] Typing text, floating photo, badges and reveals work; they stop with "reduce motion" enabled
- [ ] Project filters work; modal opens, closes with Esc and returns focus
- [ ] Form: empty and invalid email show errors; success appears only with a real endpoint
- [ ] Resume download works after adding the PDF
- [ ] Tab through the page: focus is always visible; dark/light toggle keeps its setting after reload
