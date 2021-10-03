import { random } from "../functions";
import * as simple from "./simple";
import * as normal from "./normal";


export default {
    getBot: function (difficulty: string) {
        switch (difficulty) {
            case "simple":
                return random.elemetFrom(simple);
            case "normal":
                return random.elemetFrom(normal);
            default: return;
        }
    }
}