const axios = require('axios');

// 发起`get` 请求
// axios.get('http://localhost:3000', {
//     params: {
//         id: 132444
//     }
// })
//   .then(function (response) {
//     // 请求成功后，这里处理返回数据
//     console.log(response);
//   })
//   .catch(function (error) {
//     //出现异常后，这里处理异常数据
//     console.log(error);
//   })
//   .then(function () {
//     // 这里 总是会进行，类似 `try`,`catch`,`finally`
//   });
axios.post('http://localhost:6000', {
        id: 13244 }
)
  .then(function (response) {
    // 请求成功后，这里处理返回数据
    console.log(response);
  })
  .catch(function (error) {
    //出现异常后，这里处理异常数据
    console.log(error);
  })
  .then(function () {
    // 这里 总是会进行，类似 `try`,`catch`,`finally`
  });