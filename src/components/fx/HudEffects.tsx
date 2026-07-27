"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";
const MAGNETIC_SELECTOR = "[data-magnetic]";
const SPOTLIGHT_SELECTOR = "[data-spotlight]";
const PARALLAX_SELECTOR = "[data-parallax-speed]";
const PROGRESS_ID = "hud-scroll-progress";
const STAGGER_MS = 90;
const MAGNETIC_RANGE_PX = 12; // ((0.5) - (-0.5)) * 12 = 6px de deslocamento máximo por eixo (teto)

/**
 * Client component que monta todos os listeners do HUD FX: reveal on scroll
 * com stagger, scroll progress bar, parallax de fundo, magnetic cards e
 * spotlight de cursor. Não renderiza nada visível.
 *
 * Porte do `portfolio-freela/src/components/fx/HudEffects.tsx`, com o
 * acréscimo do spotlight (densidade alta — coluna "Julio" do catálogo,
 * PRD-01 §6.17), que reusa o mesmo listener de `mousemove` do magnetic.
 *
 * Regras:
 * - Nenhum `<script>` mutante na árvore do layout: o estado inicial
 *   escondido de `[data-reveal]` vale sempre no CSS, e um `<noscript>` no
 *   `<body>` desfaz quando não há JS (ver app/[locale]/layout.tsx). Um
 *   script que escrevesse uma classe `js` no `<html>` depois da hidratação
 *   causaria className divergente servidor×cliente e derrubaria este
 *   componente junto.
 * - Rede de segurança: passados 1500ms, revela tudo que sobrou — cobre
 *   qualquer falha do IntersectionObserver.
 * - `prefers-reduced-motion: reduce` desliga scroll/parallax/magnetic/
 *   spotlight por completo (o CSS já cobre a parte visual de deixar tudo
 *   estático).
 * - Efeitos de cursor só sob `pointer: fine`.
 * - Cleanup completo no unmount.
 *
 * BUG CORRIGIDO (2026-07-27): este componente vive no layout, que nao
 * remonta em navegacao client-side entre paginas (App Router). Sem o
 * `pathname` como dependencia, o efeito rodava uma unica vez na primeira
 * carga: o observer e a rede de seguranca so enxergavam os elementos daquele
 * momento. Ao clicar num link do menu, o conteudo da pagina nova nascia
 * escondido e nunca era revelado -- travado em opacity:0 pra sempre. So
 * aparecia com reload completo, por isso passou pelos testes anteriores.
 */
export function HudEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    // Stagger de 90ms por índice, reiniciando a contagem dentro de cada section.
    document.querySelectorAll("section").forEach((section) => {
      let index = 0;
      section
        .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
        .forEach((node) => {
          node.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
          index += 1;
        });
    });

    let observer: IntersectionObserver | null = null;
    if (reveals.length) {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
        );
        reveals.forEach((node) => observer?.observe(node));
      } else {
        // Fallback: sem IntersectionObserver, revela tudo de uma vez.
        reveals.forEach((node) => node.classList.add("in-view"));
      }
    }

    // Rede de seguranca: o conteudo nasce escondido, entao se o observer nao
    // entregar por qualquer motivo (ambiente sem composicao, aba em background
    // no primeiro paint, extensao interferindo) a pagina ficaria em branco.
    // Passado esse tempo, revela o que sobrou -- invisivel quando tudo funciona.
    const failsafe = window.setTimeout(() => {
      reveals.forEach((node) => node.classList.add("in-view"));
    }, 1500);

    const progressBar = document.getElementById(PROGRESS_ID);
    let cleanupScroll = () => {};
    let cleanupPointerFx = () => {};

    if (!reduceMotion) {
      const parallaxItems = Array.from(
        document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR),
      );

      let ticking = false;
      const updateScrollFx = () => {
        const y = window.scrollY || 0;
        const doc = document.documentElement.scrollHeight - window.innerHeight;
        const progress = doc > 0 ? Math.min(1, Math.max(0, y / doc)) : 0;

        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
        }

        parallaxItems.forEach((item) => {
          const speed = Number(item.dataset.parallaxSpeed || 0);
          const offset = y * speed;
          item.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        });

        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollFx);
          ticking = true;
        }
      };

      updateScrollFx();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });

      cleanupScroll = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) {
        const teardownFns: Array<() => void> = [];

        const magneticCards = Array.from(
          document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR),
        );
        magneticCards.forEach((card) => {
          const onMouseMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const mx =
              ((event.clientX - rect.left) / rect.width - 0.5) *
              MAGNETIC_RANGE_PX;
            const my =
              ((event.clientY - rect.top) / rect.height - 0.5) *
              MAGNETIC_RANGE_PX;
            card.style.setProperty("--mx", `${mx.toFixed(2)}px`);
            card.style.setProperty("--my", `${my.toFixed(2)}px`);
          };
          const onMouseLeave = () => {
            card.style.setProperty("--mx", "0px");
            card.style.setProperty("--my", "0px");
          };

          card.addEventListener("mousemove", onMouseMove);
          card.addEventListener("mouseleave", onMouseLeave);
          teardownFns.push(() => {
            card.removeEventListener("mousemove", onMouseMove);
            card.removeEventListener("mouseleave", onMouseLeave);
          });
        });

        // 6.17 Spotlight — reusa a mesma técnica de listener do magnetic,
        // zero JS extra: só escreve posição em % pra centralizar o
        // radial-gradient (ver [data-spotlight] em globals.css).
        const spotlightCards = Array.from(
          document.querySelectorAll<HTMLElement>(SPOTLIGHT_SELECTOR),
        );
        spotlightCards.forEach((card) => {
          const onMouseMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
            card.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
          };

          card.addEventListener("mousemove", onMouseMove);
          teardownFns.push(() => {
            card.removeEventListener("mousemove", onMouseMove);
          });
        });

        cleanupPointerFx = () => teardownFns.forEach((fn) => fn());
      }
    } else if (progressBar) {
      progressBar.style.display = "none";
    }

    return () => {
      window.clearTimeout(failsafe);
      observer?.disconnect();
      cleanupScroll();
      cleanupPointerFx();
    };
  }, [pathname]);

  return null;
}
