## Create Apartment Booking.


Inorder to place a booking, we'll creata a lambda function that acts as a lambda function and configure it to act as the datasource for the `createApartment` api.


Let's get started.

### Importing the required dependencies.

Not that in workshop, we are using `AWS-SDK` version 3 for javascript.

```
import { DynamoDB } from "aws-sdk";

import { Context, SQSEvent, SQSRecord } from "aws-lambda";
```

### Defining the lambda handler
