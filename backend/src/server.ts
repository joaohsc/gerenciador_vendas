import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { errorHandler } from './utils';
import routes from './routes/routes'

const app = express();

app.use(express.json());

app.use(routes)

app.use((err: any, req : Request, res : Response, next: NextFunction)=>{
    errorHandler.handle(err,res);
});


const port : number = 3333
app.listen(port, ()=> 
    console.log(`server running on port ${port}`)
)
