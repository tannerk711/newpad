/**
 * GSAP hero entrance animation.
 * Replaces CSS fadeUp with a richer stagger sequence.
 * Runs on page load (above the fold, no ScrollTrigger needed).
 * Respects prefers-reduced-motion.
 */
import { gsap } from 'gsap';

export function initHeroAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Target hero elements by data attributes
  const heroTitle = document.querySelector('[data-hero="title"]');
  const heroSubhead = document.querySelector('[data-hero="subhead"]');
  const heroBadges = document.querySelector('[data-hero="badges"]');
  const heroForm = document.querySelector('[data-hero="form"]');

  const elements = [heroTitle, heroSubhead, heroBadges, heroForm].filter(Boolean);

  if (elements.length === 0) return;

  if (prefersReduced) {
    // Show everything instantly
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  // Set initial hidden state (prevents CSS animation flash)
  gsap.set(elements, { opacity: 0, y: 30 });

  // Build a stagger timeline
  const tl = gsap.timeline({ delay: 0.2 });

  if (heroTitle) {
    tl.to(heroTitle, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  }

  if (heroSubhead) {
    tl.to(
      heroSubhead,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );
  }

  if (heroBadges) {
    tl.to(
      heroBadges,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );
  }

  if (heroForm) {
    tl.to(
      heroForm,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3'
    );
  }
}
