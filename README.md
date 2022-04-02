## MongoDB Test 1

[Test tools](https://mongoplayground.net/p/qgn-80Z4hfX)

[Sample Data](https://api.jsonbin.io/b/6108111bf14b8b153e05f501)

Expected Result	: menampilkan data total harga dan total promo masing-masing catalog dari sample data.


```sh
db.collection.aggregate([
    {
      $project: {
        catalog: "$catalog",
        totalPrice: {
          $sum: "$book.price"
        },
        totalPromo: {
          $sum: "$book.promo"
        }
      }
    }
  ])
```

result

```sh
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "catalog": "A",
    "totalPrice": 140000,
    "totalPromo": 32000
  },
  {
    "_id": ObjectId("5a934e000102030405000001"),
    "catalog": "B",
    "totalPrice": 145000,
    "totalPromo": 31000
  }
]
```

## MongoDB Test 2

[Test tools](https://mongoplayground.net/p/T9f4Lt1teEj)

[Sample Data](https://api.jsonbin.io/b/620dc3e64bf50f4b2dff6f12)

Expected Result	: Menandai User yang berkesempatan mendapatkan promo berdasarkan status dan total amount transaksi. User yang berkesempatan mendapatkan promo yaitu User yang memiliki status NEW atau User yang memiliki total amount transaksi lebih dari 50000 dimana total amount transaksi didapatkan dari jumlah amount transaksi masing-masing user.


```sh
db.collection.aggregate([
    {
      $project: {
        "status": "$status",
        "user": "$user",
        "totalAmount": {
          "$sum": "$transaction.amount"
        },
        "getPromo": {
          $switch: {
            branches: [
              {
                case: {
                  $gte: [
                    {
                      $sum: "$transaction.amount"
                    },
                    50000
                  ]
                },
                then: "true"
              },
              {
                case: {
                  $in: [
                    [
                      "$status"
                    ],
                    [
                      [
                        "NEW"
                      ]
                    ]
                  ]
                },
                then: "true"
              }
            ],
            default: "false"
          }
        }
      }
    }
  ])
```

result

```sh
[
  {
    "_id": ObjectId("5a934e000102030405000000"),
    "getPromo": "true",
    "status": "REGISTERED",
    "totalAmount": 140000,
    "user": "A"
  },
  {
    "_id": ObjectId("5a934e000102030405000001"),
    "getPromo": "true",
    "status": "NEW",
    "totalAmount": 30000,
    "user": "B"
  },
  {
    "_id": ObjectId("5a934e000102030405000002"),
    "getPromo": "false",
    "status": "REGISTERED",
    "totalAmount": 30000,
    "user": "C"
  }
]
```