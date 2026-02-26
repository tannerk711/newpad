/**
 * GSAP ScrollTrigger animations for all below-fold sections.
 * Handles: Inventory fade-in, Testimonial stagger, Pick Your Path slide-up, Final CTA fade-in.
 * Respects prefers-reduced-motion.
 *
 * Uses ScrollTrigger batches + fromTo for reliability.
 * Elements start visible (no FOUC), get set to hidden by GSAP, then animate in on scroll.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Shared defaults */
const DURATION = 0.8;
const EASE = 'power2.out';
const STAGGER = 0.15;

/** Helper: animate a single element with scroll trigger */
function scrollReveal(
  el: Element | null,
  trigger: string | Element,
  fromVars: gsap.TweenVars,
  delay = 0
) {
  if (!el) return;
  gsap.set(el, { ...fromVars }); // set hidden state
  ScrollTrigger.create({
    trigger: trigger,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: DURATION,
        ease: EASE,
        delay,
        ...fromVars._toOverrides,
      });
    },
    onEnterBack: () => {
      // Also show if user scrolls back up
      gsap.to(el, { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.4, ease: EASE });
    },
  });
}

/** Helper: stagger-animate a set of elements */
function scrollRevealStagger(
  els: NodeListOf<Element> | Element[],
  trigger: string | Element,
  fromVars: gsap.TweenVars,
  stagger = STAGGER,
  toOverrides: gsap.TweenVars = {}
) {
  if (!els || els.length === 0) return;
  gsap.set(els, { ...fromVars });
  ScrollTrigger.create({
    trigger: trigger,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: DURATION,
        ease: EASE,
        stagger,
        ...toOverrides,
      });
    },
    onEnterBack: () => {
      gsap.to(els, { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.4, ease: EASE, stagger: 0.05 });
    },
  });
}

export function initScrollAnimations() {
  // Bail out entirely if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Elements are already visible by default, do nothing
  }

  // --- Inventory Section ---
  const inventoryHeading = document.querySelector('#inventory [data-gsap="heading"]');
  const inventorySubhead = document.querySelector('#inventory [data-gsap="subhead"]');
  const inventoryCarousel = document.querySelector('#inventory [data-gsap="carousel"]');
  const inventoryCta = document.querySelector('#inventory [data-gsap="cta"]');

  scrollReveal(inventoryHeading, '#inventory', { opacity: 0, y: 30 });
  scrollReveal(inventorySubhead, '#inventory', { opacity: 0, y: 20 }, 0.15);
  scrollReveal(inventoryCarousel, '#inventory', { opacity: 0, y: 40 }, 0.3);
  scrollReveal(inventoryCta, inventoryCta || '#inventory', { opacity: 0, y: 20 }, 0.1);

  // --- Testimonials Section ---
  const testimonialsHeading = document.querySelector('#testimonials [data-gsap="heading"]');
  const testimonialsSubhead = document.querySelector('#testimonials [data-gsap="subhead"]');
  const testimonialCards = document.querySelectorAll('#testimonials [data-gsap="card"]');
  const testimonialsCta = document.querySelector('#testimonials [data-gsap="cta"]');

  scrollReveal(testimonialsHeading, '#testimonials', { opacity: 0, y: 30 });
  scrollReveal(testimonialsSubhead, '#testimonials', { opacity: 0, y: 20 }, 0.15);
  scrollRevealStagger(testimonialCards, '#testimonials', { opacity: 0, y: 50 });
  scrollReveal(testimonialsCta, testimonialsCta || '#testimonials', { opacity: 0, y: 20 }, 0.1);

  // --- Pick Your Path Section ---
  const pathHeading = document.querySelector('#pick-your-path [data-gsap="heading"]');
  const pathSubhead = document.querySelector('#pick-your-path [data-gsap="subhead"]');
  const pathTiles = document.querySelectorAll('#pick-your-path [data-gsap="tile"]');

  scrollReveal(pathHeading, '#pick-your-path', { opacity: 0, y: 30 });
  scrollReveal(pathSubhead, '#pick-your-path', { opacity: 0, y: 20 }, 0.15);
  scrollRevealStagger(pathTiles, '#pick-your-path', { opacity: 0, y: 60 }, 0.12, {
    duration: 0.9,
    ease: 'power3.out',
  });

  // --- Final CTA Section ---
  const ctaHeading = document.querySelector('#final-cta [data-gsap="heading"]');
  const ctaSubhead = document.querySelector('#final-cta [data-gsap="subhead"]');
  const ctaButton = document.querySelector('#final-cta [data-gsap="button"]');
  const ctaTrust = document.querySelector('#final-cta [data-gsap="trust"]');

  scrollReveal(ctaHeading, '#final-cta', { opacity: 0, y: 30 });
  scrollReveal(ctaSubhead, '#final-cta', { opacity: 0, y: 20 }, 0.15);

  if (ctaButton) {
    gsap.set(ctaButton, { opacity: 0, y: 20, scale: 0.95 });
    ScrollTrigger.create({
      trigger: '#final-cta',
      start: 'top 85%',
      onEnter: () => {
        gsap.to(ctaButton, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION,
          ease: 'back.out(1.4)',
          delay: 0.3,
        });
      },
      onEnterBack: () => {
        gsap.to(ctaButton, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: EASE });
      },
    });
  }

  scrollReveal(ctaTrust, '#final-cta', { opacity: 0, y: 15 }, 0.45);

  // Refresh ScrollTrigger after all setup (handles layout shifts from lazy images)
  ScrollTrigger.refresh();
}
