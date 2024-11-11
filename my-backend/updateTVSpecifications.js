const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Change this to your MongoDB URI
const client = new MongoClient(uri);

const specificationsData = [
    {
        screenType: 'LED',
        screenSize: '32',
        resolution: 'HD',
        refreshRate: '60',
        HDR: 'No',
    },
    {
        screenType: 'OLED',
        screenSize: '40',
        resolution: 'Full HD',
        refreshRate: '60',
        HDR: 'Yes',
    },
    {
        screenType: 'QLED',
        screenSize: '49',
        resolution: '4K',
        refreshRate: '120',
        HDR: 'Yes',
    },
    {
        screenType: 'LCD',
        screenSize: '55',
        resolution: '4K',
        refreshRate: '60',
        HDR: 'No',
    },
    {
        screenType: 'Plasma',
        screenSize: '65',
        resolution: '4K',
        refreshRate: '120',
        HDR: 'Yes',
    },
    {
        screenType: 'NanoCell',
        screenSize: '75',
        resolution: '4K',
        refreshRate: '240',
        HDR: 'Yes',
    },
    // You can add more specifications if needed
];

async function updateTVSpecifications() {
    try {
        await client.connect();
        const database = client.db('BDT_users'); // Replace with your database name
        const collection = database.collection('products'); // Replace with your collection name

        const tvProducts = await collection.find({ category: 'tv', specifications: { $exists: false } }).toArray();

        for (let i = 0; i < tvProducts.length; i++) {
            const randomIndex = i % specificationsData.length; // Loop through specificationsData
            const specifications = specificationsData[randomIndex];

            await collection.updateOne(
                { _id: tvProducts[i]._id },
                { $set: { specifications: {
                    screenType: specifications.screenType,
                    screenSize: specifications.screenSize, // Removed the "inches" suffix
                    resolution: specifications.resolution,
                    refreshRate: specifications.refreshRate,
                    HDR: specifications.HDR,
                }}}
            );

            console.log(`Updated TV product with ID: ${tvProducts[i]._id}`);
        }

    } catch (error) {
        console.error('Error updating TV specifications:', error);
    } finally {
        await client.close();
    }
}

updateTVSpecifications();
