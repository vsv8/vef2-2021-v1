export default function formatUploadDate(msec) {
    const time = Date.now() - msec;
    const seconds = Math.floor(time/1000);
    const hours = Math.floor(seconds/3600);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    const months = Math.floor(days/30);
    const years = Math.floor(months/12);

    if (hours < 24) {
        return (hours === 1) ? `Fyrir ${hours} klukkustund`
            : `Fyrir ${hours} klukkustundum`;
    }
    else if (days < 7) {
        return (days === 1) ? `Fyrir ${days} degi`
            : `Fyrir ${days} dögum`;
    }
    else if (weeks <= 4) {
        return (weeks === 1) ? `Fyrir ${weeks} viku`
            : `Fyrir ${weeks} vikum`;
    }
    else if (months < 12) {
        return (months === 1) ? `Fyrir ${months} mánuði`
            : `Fyrir ${months} mánuðum`;
    }
    else {
        return (years === 1) ? `Fyrir ${years} ári`
            : `Fyrir ${years} árum`;
    }
    return "";
}