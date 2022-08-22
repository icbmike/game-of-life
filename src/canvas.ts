export const createCanvasAndContext = () => {
    const cvs = document.createElement("canvas");

    cvs.style.height = '800px';
    cvs.style.width = '100%';
    cvs.style.backgroundColor = 'pink';

    document.body.appendChild(cvs);

    const dpr = window.devicePixelRatio || 1;

    cvs.width = cvs.getBoundingClientRect().width * dpr;
    cvs.height = 800 * dpr;

    const ctx = cvs.getContext('2d')!;

    ctx.scale(dpr, dpr);

    return { cvs, ctx };
}