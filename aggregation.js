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

  db.collection.aggregate([
    {
      $project: {
        item: 1,
        getPromo: {
          $cond: {
            if: {
              $in: [
                [
                  "$status"
                ],
                [
                  [
                    "NEW"
                  ]
                ]
              ],
              
            },
            then: "true",
            else: "false"
          },
          
        },
        status: "$status",
        user: "$user",
        totalAmount: {
          "$sum": "$transaction.amount"
        }
      }
    }
  ])




  db.inventory.aggregate(
    [
       {
          $project:
            {
              item: 1,
              discount:
                {
                  $cond: { if: { $gte: [ "$qty", 250 ] }, then: 30, else: 20 }
                }
            }
       }
    ]
 )


 db.collection.aggregate([
    {
      $project: {
        item: 1,
        status: "$status",
        user: "$user",
        totalAmount: {
          "$sum": "$transaction.amount"
        }
      }
    },
    {
      $addFields: {
        getPromo: {
          $cond: {
            if: {
              $in: [
                [
                  "$status"
                ],
                [
                  [
                    "NEW"
                  ]
                ]
              ],
              
            },
            then: "true",
            else: "false"
          },
          
        }
      }
    }
  ])