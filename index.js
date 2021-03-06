// Support classes
import auth from "./src/auth.apollo";
import storage from "./src/storage.apollo";
import device from "./src/device.apollo";

// Handlers
import post from "./src/handlers/post.handler";
import duplex from "./src/handlers/duplex.handler";

// The main config object to stores the
// base urls of the Grandeur Server
const config = {
    url: "https://api.grandeur.tech",
    node: "wss://api.grandeur.tech"
}

// Function that initializes 
// the object
function init(apiKey) {
    // Returns a Object with a refernce to
    // Apollo Supported Classes
    const apolloConfig = {...config, apiKey}

    // Post Handler
    const postHandler = new post(apolloConfig);

    // Duplex Handler
    const duplexHandler = new duplex(apolloConfig);
    
    // Handlers
    const handlers = {
        post: postHandler,
        duplex: duplexHandler
    };

    // Initialize the Connection
    // to the Server
    duplexHandler.init(new auth(handlers));

    // Return reference to the classes
    return {
        // Helper Method
        isConnected: () => handlers.duplex.status === "CONNECTED",

        // Classes
        auth: () => new auth(handlers),
        storage: () => new storage(handlers),
        device: () => new device(handlers)
    }
}

export {init};