# Accessibility Documentation

This document outlines the accessibility features implemented in the portfolio website to ensure WCAG 2.1 AA compliance.

## Overview

The portfolio website has been designed and developed with accessibility as a core principle, ensuring that all users, regardless of their abilities or the assistive technologies they use, can access and interact with the content.

## Accessibility Features

### 1. Keyboard Navigation

#### Focus Indicators
- **Focus-visible only**: Focus indicators appear only for keyboard navigation, not mouse clicks
- **2px solid outline**: All interactive elements have a 2px solid blue (#3b82f6) outline when focused
- **2px offset**: Focus outlines have a 2px offset for better visibility
- **Rounded corners**: Focus indicators have 4px border-radius for visual consistency

#### Skip to Main Content
- **Skip link**: A "Skip to main content" link is provided at the top of the page
- **Keyboard accessible**: The skip link is visible when focused via keyboard (Tab key)
- **Direct navigation**: Allows keyboard users to bypass navigation and jump directly to main content

#### Interactive Elements
All interactive elements are keyboard accessible:
- Navigation links
- Buttons (CTAs, form submit, etc.)
- Form inputs and textareas
- Social media links
- Theme toggle

### 2. Color Contrast

All color combinations meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text):

#### Text Colors
- **White on dark background**: 19.25:1 ✅
- **Light gray on dark background**: 7.51:1 ✅
- **Accent blue (links)**: 5.24:1 ✅
- **Accent purple**: 4.87:1 ✅
- **Accent green**: 7.59:1 ✅

#### Button Colors
- **White text on blue-dark button**: 5.17:1 ✅
- **White text on secondary button**: 15.07:1 ✅

#### Glassmorphic Elements
- **White text on glass surface**: 14.63:1 ✅
- **Light gray text on glass surface**: 5.71:1 ✅

#### Color Palette
- **Primary blue (text/links)**: #3b82f6 - Used for text, links, and focus indicators
- **Dark blue (buttons)**: #2563eb - Used for button backgrounds with white text
- **Purple accent**: #a855f7
- **Green accent**: #10b981
- **Red accent**: #ef4444

### 3. Semantic HTML

#### Document Structure
- **Proper heading hierarchy**: Single h1, followed by h2, h3, etc. without skipping levels
- **Landmark regions**: 
  - `<header>` with `role="banner"`
  - `<main>` with `role="main"` and `id="main-content"`
  - `<nav>` with `aria-label="Main navigation"`
  - `<footer>` with `role="contentinfo"`
- **Section elements**: All major sections use semantic `<section>` elements

#### ARIA Labels
- **Navigation**: `aria-label="Main navigation"` and `aria-label="Mobile navigation"`
- **Buttons**: All buttons have descriptive `aria-label` attributes
- **Links**: External links include `rel="noopener noreferrer"` for security
- **Form inputs**: All inputs have associated labels or `aria-label` attributes
- **Interactive elements**: Proper `aria-expanded`, `aria-controls`, and `aria-current` attributes

### 4. Reduced Motion Support

#### Media Query
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

#### Behavior
- **Animations disabled**: All animations are reduced to 0.01ms duration
- **Scroll behavior**: Smooth scrolling is disabled
- **Scroll animations**: All scroll-triggered animations are disabled
- **Transitions**: All CSS transitions are reduced to minimal duration

### 5. Form Accessibility

#### Labels
- **Visible labels**: All form inputs have visible labels
- **Label association**: Labels are properly associated with inputs via `for` attribute
- **Uppercase styling**: Labels use uppercase with letter-spacing for visual hierarchy

#### Focus States
- **Ring indicator**: 2px ring appears on focus-visible
- **Border color**: Border color changes to accent blue on focus
- **Hover states**: Border brightness increases on hover

#### Error Handling
- **Error messages**: Validation errors are displayed below inputs
- **Color coding**: Error states use red color (#ef4444)
- **Accessible text**: Error messages are readable by screen readers

### 6. Touch Target Sizes

#### Mobile Optimization
- **Minimum size**: All interactive elements have minimum 44x44px touch targets on mobile
- **Adequate spacing**: Sufficient spacing between interactive elements
- **Responsive design**: Touch targets scale appropriately across breakpoints

### 7. Screen Reader Support

#### Screen Reader Only Content
- **`.sr-only` class**: Hides content visually but keeps it accessible to screen readers
- **Skip link**: Uses `.sr-only` and becomes visible on focus
- **Icon labels**: Decorative icons are marked with `aria-hidden="true"`

#### Alt Text
- **Image descriptions**: All images have descriptive alt text
- **Decorative images**: Decorative images use `aria-hidden="true"` or `role="presentation"`

### 8. Testing

#### Automated Testing
- **Axe accessibility scanner**: Integrated in Playwright tests
- **WCAG 2.1 AA compliance**: Tests for WCAG 2.1 Level A and AA standards
- **Color contrast verification**: Custom script verifies all color combinations

#### Manual Testing
- **Keyboard navigation**: All interactive elements tested with keyboard only
- **Screen reader testing**: Tested with NVDA/JAWS on Windows, VoiceOver on macOS
- **Reduced motion**: Tested with `prefers-reduced-motion: reduce` setting

## Verification

### Running Accessibility Tests

```bash
# Run all accessibility tests
npm test -- accessibility-compliance.spec.ts

# Verify color contrast ratios
node scripts/verify-color-contrast.js
```

### Browser Testing
- Chrome DevTools Lighthouse (Accessibility score)
- Firefox Accessibility Inspector
- axe DevTools browser extension

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Continuous Improvement

Accessibility is an ongoing commitment. We regularly:
- Review and update accessibility features
- Test with real users who rely on assistive technologies
- Stay current with WCAG guidelines and best practices
- Monitor and fix accessibility issues reported by users

## Contact

If you encounter any accessibility barriers or have suggestions for improvement, please contact us through the contact form or email directly.
