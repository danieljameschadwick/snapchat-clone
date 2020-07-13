// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export const stretchViewPortHeight = (elem = document.documentElement) => {
    const viewportHeight = window.innerHeight * 0.01;
    elem.style.setProperty('--vh', viewportHeight + 'px');
};