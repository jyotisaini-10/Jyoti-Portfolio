# Jyoti Saini Portfolio

A modern, animated developer portfolio inspired by the [Moncy 3D portfolio style](https://github.com/MoncyDev/Portfolio-Website) featured in this [Instagram reel](https://www.instagram.com/reel/DVoLIbRssl_/).

## Features

- Dark glassmorphism UI with purple/cyan gradients
- GSAP scroll animations
- Typing effect in hero section
- Particle background canvas
- 3D tilt cards on hover
- Bento grid project layout
- Animated experience timeline
- Fully responsive mobile menu

## Run

1. Open `index.html` directly in your browser, or
2. Use VS Code **Live Server** extension for best results

## Customize

- **Content**: Edit `index.html`
- **Colors & layout**: Edit `style.css`
- **Animations & typing roles**: Edit `script.js`

## Add Your Photo

Replace the `JS` avatar placeholder in the hero section with your image:

```html
<img src="./profile.jpg" alt="Jyoti Saini" class="avatar-img" />
```

Then add to `style.css`:

```css
.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
```
