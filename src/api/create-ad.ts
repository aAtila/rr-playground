type Ad = {
  id: string;
  category: string;
};

export const createAd = (category: string): Promise<Ad> => {
  return new Promise((resolve) => {
    const delay = Math.random() * 600 + 200;

    const randomBytes = window.crypto.getRandomValues(new Uint8Array(4));
    const adId = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 10);

    setTimeout(() => {
      resolve({ id: adId, category });
    }, delay);
  });
};
