import globals from "../globals";

const pageSettings = {
    setTitle(title) {
        document.title = globals.pageTitle + " - " + title;
    }
}

export default pageSettings;