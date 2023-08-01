// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';

// import dalleRoutes from './routes/dalle.routes.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// app.use('/api/v1/dalle', dalleRoutes);

// app.get('/', (req, res) => {
//     res.status(200).json({message: "Hello from DALL.E"})
// })

// app.listen(5000, () => console.log('Server has started on port 5000'));

 












// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import dalleRoutes from './routes/dalle.routes.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// app.use('/api/v1/dalle', dalleRoutes);

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hello from DALL.E" });
// });

// app.listen(5000, () => console.log('Server has started on port 5000'));














import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E" });
});

const PORT = process.env.PORT || 5000;  // Use the PORT environment variable if available

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
