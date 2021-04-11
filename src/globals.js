
const url = process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "NOT IMLPEMENTED";
const backendUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "NOT IMLPEMENTED";

const globals = {
    url: url,
    backendUrl: backendUrl,
    pageTitle: 'FUml'
}

export default globals;