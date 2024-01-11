const artworkUrls = [
    "https://api.artic.edu/api/v1/artworks/129883",
    "https://api.artic.edu/api/v1/artworks/129884",
    "https://api.artic.edu/api/v1/artworks/129885"
];

async function artworkFetch(urls) {
    const res = await fetch(urls);
    const data = await res.json();
    return data.data;
}

async function displayArtwork() {
    try {
        const artworkContainer = document.getElementById('artworkContainer');

        const artworks = await Promise.all(artworkUrls.map(urls => artworkFetch(urls)));

        artworks.forEach(artwork => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h2');
            title.textContent = artwork.title;

            const description = document.createElement('p');
            description.textContent = artwork.description;

            const image = document.createElement('img');
            image.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
            image.alt = artwork.title;

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(image);

            artworkContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error to fetch a data: ', error);
    }
};

displayArtwork();