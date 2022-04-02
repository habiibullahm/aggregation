//Mongodb Test 1 

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

  //Mongodb Test 2
  
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

 