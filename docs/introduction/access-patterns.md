# Access Patterns

Administrator

- Create/update/delete Administrator accounts.

```jsx
PK:USER#EMAIL
SK:USER#EMAIL
```

- Create/Update/Read/List/Delete Buildings

```jsx
PK:BUILDING
SK:BUILDING#BUILDINGID
```

- Create/Update/Delete Apartments

```jsx
PK:BUILDING#BUILDINGID
SK:APARTMENT#APARTMENTID
```

- list all buildings

```jsx
starts_with(BUILDING#)
PK:BUILDING
SK: BUILDING#
```

- list apartments per building

```jsx
starts_with(APARTMENT#)
PK:BUILDING#BUILDINGID
SK:APARTMENT#
```

- list all bookings per apartment

```jsx
begins_with(BOOKINGS#)
PK:APARTMENTS#APARTMENTID
SK:BOOKINGS#
```

Tenants

- Create/update/read/delete account

```jsx
PK:USER#EMAIL
SK:USER#EMAIL

```

- List all Buildings in their Area

```jsx
filter with `longitude` and `latitude`
PK:BUILDING
SK:BUILDING#BUILDINGID
```

- List available apartments for each building

```jsx
conditional expression `where status==available`
PK:BUILDING#BUILDINGID
SK:APARTMENT#
```

- Book an apartment

```jsx

BOOKING_STATUS = PENDING

PK:USER#USERNAME
SK:APARTMENT#APARTMENTID
GSI
GSI1PK:BUILDING#BUILDINGID
GSI1SK:APARTMENT#APARTMENTID#STATUS
```

### Single Table DynamoDB Design



![alt text](https://d23o47bsb60hff.cloudfront.net/public/c3fd05c6-cdf3-4109-bc5c-3195182963eb)


## NOSQL WORKBENCH

![alt text](https://d23o47bsb60hff.cloudfront.net/public/4b71d8ca-5dc9-44da-813c-254b7c2a0ee6)

### Get All Apartments Per Building

![alt text](https://d23o47bsb60hff.cloudfront.net/public/fb514f53-ce05-498f-b441-8516311df909)

### Get All Bookings Per Apartment

![alt text](https://d23o47bsb60hff.cloudfront.net/public/fd2f5bc9-9096-476c-b740-010b857f69a2)


### Get All Buildings Per User

![alt text](https://d23o47bsb60hff.cloudfront.net/public/e1b30692-39b0-4cea-a162-0478d6a4ec64)
