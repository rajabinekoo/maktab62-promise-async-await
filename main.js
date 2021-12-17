// let url = "https://reqres.in/api/users?page=1";
// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   .then((body) => {
//     console.log(body);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("ok");
//   });

let setTimeoutPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("hello promise");
  }, 2000);
});

// let promiseAjax = new Promise(function (resolve, reject) {
//   $.ajax({
//     type: "GET",
//     url: url,
//     success: function (response) {
//       resolve(response);
//     },
//     error: function (err) {
//       reject(err);
//     },
//   });
// });

let promiseAjax = function (url, { method, data, dataType, contentType }) {
  return new Promise(function (resolve, reject) {
    let options = {
      type: method,
      url: url,
      success: resolve,
      error: reject,
    };
    if (!!data) options["data"] = data;
    if (!!dataType) options["dataType"] = dataType;
    if (!!contentType) options["contentType"] = contentType;
    $.ajax(options);
  });
};

promiseAjax("https://reqres.in/api/users?page=1", { method: "GET" })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

promiseAjax("https://reqres.in/api/users", {
  method: "POST",
  data: JSON.stringify({
    name: "morpheus",
    job: "leader",
  }),
  dataType: "json",
  contentType: "application/json; charset=utf-8",
})
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

Promise.all([
  promiseAjax("https://reqres.in/api/users?page=1", { method: "GET" }),
  promiseAjax("https://reqres.in/api/users", {
    method: "POST",
    data: JSON.stringify({
      name: "morpheus",
      job: "leader",
    }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
  }),
  setTimeoutPromise,
])
  .then(([promiseAjax1, promiseAjax2, setTimeoutResult]) => {
    console.log(promiseAjax1);
    console.log(promiseAjax2);
    console.log(setTimeoutResult);
  })
  .catch((err) => console.log(err));

Promise.race([
  promiseAjax("https://reqres.in/api/users?page=1", { method: "GET" }),
  promiseAjax("https://reqres.in/api/users?page=2", { method: "GET" }),
])
  .then((result) => {
    console.log("race result: ", result);
  })
  .catch((err) => console.log(err));
