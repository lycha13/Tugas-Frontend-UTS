const STORAGE_KEY = "agrimanage_lands";

export const getAllLands = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const addNewLand = (land) => {
    const lands = getAllLands();

    const newLand = {
        id: Date.now(),
        ...land
    };

    lands.push(newLand);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(lands));
};

export const updateLand = (id, updatedData) => {
    const lands = getAllLands();

    const updatedLands = lands.map(land =>
        land.id === id ? { ...land, ...updatedData } : land
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLands));
};

export const removeLandById = (id) => {
    const lands = getAllLands();

    const updatedLands = lands.filter(land => land.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLands));
};

export const calculateTotalArea = (lands) => {
    return lands.reduce((total, land) => total + Number(land.area), 0);
};