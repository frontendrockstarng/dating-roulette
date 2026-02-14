// Format date idea as text
const formatDateText = (dateData) => {
    const { title, location, budget, totalCost, activities, proTip } = dateData;

    let text = `🎰 ${title}\n\n`;
    text += `📍 ${location} | 💰 ${budget} (~$${totalCost})\n\n`;

    activities.forEach(activity => {
        text += `⏰ ${activity.time}\n`;
        text += `${activity.activity}\n`;
        text += `→ ${activity.details}\n\n`;
    });

    text += `✨ Pro Tip: ${proTip}\n\n`;
    text += `Generated with Date Night Roulette 🎰`;

    return text;
};

// Share via Web Share API or fallback to clipboard
export const shareDate = async (dateData) => {
    const text = formatDateText(dateData);

    // Try native share API first (mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Date Night Roulette',
                text: text,
                url: window.location.href
            });
            return { success: true, method: 'native' };
        } catch (error) {
            // User cancelled or share failed
            if (error.name !== 'AbortError') {
                console.error('Share error:', error);
            }
        }
    }

    // Fallback: Copy to clipboard
    try {
        await navigator.clipboard.writeText(text);
        return { success: true, method: 'clipboard' };
    } catch (error) {
        console.error('Clipboard error:', error);
        return { success: false, error };
    }
};
