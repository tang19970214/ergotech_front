import path from "path";

export default [{
  name: "login",
  path: "/login",
  component: path.resolve(__dirname, "pages/login.vue")
},
//  {
//   name: "index",
//   path: "/",
//   component: path.resolve(__dirname, "pages/index.vue")
// }, 
{
  name: "checkOperation",
  path: "/",
  component: path.resolve(__dirname, "pages/checkOperation.vue")
}, {
  name: "checkJobs",
  path: "/checkJobs",
  component: path.resolve(__dirname, "pages/checkJobs.vue")
}];
