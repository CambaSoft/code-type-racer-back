class Activity {
    log = (message: string) => {
        if (!process.env.PRODUCTION) {
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    };

    info = (message: string) => {
        // tslint:disable-next-line:no-console
        console.info("\nINFO: " + message);
    };

    error = (errorMessage: string) => {
        // tslint:disable-next-line:no-console
        console.error("\n\nERROR:\n" + errorMessage);
    };

}
export = new Activity();