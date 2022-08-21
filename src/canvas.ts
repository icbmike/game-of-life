export const createCanvasAndContext = () => {
    const cvs = new HTMLCanvasElement();

    const ctx = cvs.getContext('2d')!;

    return { cvs, ctx };
}