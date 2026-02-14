const STORAGE_KEY = 'dateNightRoulette_savedDates';
const MAX_SAVED = 10;

export const saveDateIdea = (dateData) => {
    try {
        const saved = getSavedDates();

        // Add timestamp and ID
        const dateWithMeta = {
            ...dateData,
            id: Date.now().toString(),
            savedAt: new Date().toISOString()
        };

        // Add to beginning of array
        saved.unshift(dateWithMeta);

        // Keep only last MAX_SAVED items
        const trimmed = saved.slice(0, MAX_SAVED);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        return true;
    } catch (error) {
        console.error('Error saving date:', error);
        return false;
    }
};

export const getSavedDates = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error retrieving saved dates:', error);
        return [];
    }
};

export const deleteSavedDate = (id) => {
    try {
        const saved = getSavedDates();
        const filtered = saved.filter(date => date.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting date:', error);
        return false;
    }
};

export const clearAllSavedDates = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing saved dates:', error);
        return false;
    }
};
