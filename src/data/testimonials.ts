export interface Testimonial {
  quote: string;
  name: string;
  label: string;
  highlight: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "NewPad Building Company, you rock! Cooper's expertise made all the difference in our home project. Quality construction met our budget needs seamlessly. Our new home feels like a dream come true. If you're looking for a builder that cares about your wallet and your vision, NewPad is the one!",
    name: 'Sarah & David Collins',
    label: 'NewPad Homeowner',
    highlight: "Cooper's expertise made all the difference in our home project.",
  },
  {
    quote:
      "We loved the unique exterior design of the home both in structure and paint colors. The home layout itself is what we were looking for in a first home with open living, split beds, and a flex room to use as an office or bedroom depending on what we need. It is in a quiet area of a growing small town.",
    name: 'Taylor & Jose Sanchez',
    label: 'NewPad Homeowner',
    highlight: 'We loved the unique exterior design of the home.',
  },
  {
    quote:
      "Hats off to NewPad Building Company and Cooper for hitting it out of the park! Our new home is proof that you can have both quality and affordability. Cooper's expertise shone through, and the result is a house that feels like it's worth a million bucks. If I could give more stars, I would!",
    name: 'The Thompsons',
    label: 'NewPad Homeowner',
    highlight: "A house that feels like it's worth a million bucks.",
  },
];
