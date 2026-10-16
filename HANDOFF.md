# HANDOFF — portfolio-julio

## Current state

Bilingual portfolio (PT/EN) for Júlio Murashima, built with Next.js 15, TypeScript, Tailwind CSS, next-intl, Recharts, and Framer Motion.

The site is deployed at [portfolio-julio-theta.vercel.app](https://portfolio-julio-theta.vercel.app). Its case studies include interactive demonstrations. Public sports-domain demos use fictional data only. Source code for the underlying sports systems is private.

## Project structure

- `messages/`: translated interface copy.
- `src/content/{pt,en}/cases/`: case study text.
- `src/lib/mock/`: deterministic fictional data for public demos.
- `src/components/demos/`: interactive demo components.
- `CONFIDENTIALITY.md`: rules for public content and demo data.

## Working rules

- Keep all public sports-domain demos on fictional data.
- Do not add real athlete data, operational screenshots, internal system names, or local machine paths.
- Describe private systems at a high level and say that their source code is private.
- Avoid claims about production use, usage volume, team size, or module counts unless Júlio has verified them.
- Keep English and Portuguese copy consistent.
- Stop the development server before running a production build if both are running in the same checkout.

## Contact

- GitHub: [takeichijulio](https://github.com/takeichijulio)
- LinkedIn: [Júlio Murashima](https://www.linkedin.com/in/j%C3%BAlio-murashima)
- Portfolio: [portfolio-julio-theta.vercel.app](https://portfolio-julio-theta.vercel.app)
