export default function formatVideoLength(sec) {
    const mins = Math.floor(sec/60);
    const seconds = sec % 60;

    return `${mins}:${seconds < 10 ? 0 : ''}${seconds}`;
}