## MongoDB Test 1

[Tools](https://mongoplayground.net)
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
## MongoDB Test 2

Tools			: https://mongoplayground.net
Sample Data		: https://api.jsonbin.io/b/620dc3e64bf50f4b2dff6f12
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