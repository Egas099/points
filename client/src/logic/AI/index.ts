import { random } from "../common";
import * as simple from "./simple";
import * as normal from "./normal";

const AI = {
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
export default AI;
