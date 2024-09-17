


import express from 'express'; 
import cors from 'cors'; 


import posts from './routers/posts.js'; 
import users from './routers/users.js'; 
import cars from './routers/cars.js'; 
import contracts from './routers/contracts.js'; 
import detailscontracts from './routers/detailscontracts.js';  
import reviews from './routers/reviews.js';
import mongoose from 'mongoose'; 
import { getRevenueByStatusPaid } from './controllers/contracts.js';

const app = express();
const PORT = process.env.PORT || 5000; 
const URI = 'mongodb://localhost:27017/rentcar';

app.use(cors());
app.use(express.json({ limit: '100mb' })); 
app.use(express.urlencoded({ extended: true, limit: '100mb' })); 

app.use('/posts', posts); 
app.use('/users', users);
app.use('/cars', cars);
app.use('/contracts', contracts);
app.use('/detailscontracts', detailscontracts);
app.use('/reviews', reviews);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }) 

  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });

