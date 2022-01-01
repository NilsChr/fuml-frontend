
const url = process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "https://bogsynth.com/fuml" //"NOT IMLPEMENTED";
const backendUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://fuml-backend.herokuapp.com/api";

const globals = {
    url: url,
    backendUrl: backendUrl,
    pageTitle: 'FUml'
}

export default globals;