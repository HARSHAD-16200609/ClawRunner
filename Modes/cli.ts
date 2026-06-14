import chalk, { Chalk } from "chalk";
import { select, isCancel } from "@clack/prompts"
import { wakeup } from "../tui/wakeup";
import {runAgentMode } from "./agent/orchestrator.ts"
import { runAskMode } from "./ask/orchestrator.ts";
import { runPlanMode } from "./plan/orchestrator.ts";

export async function runCliMode() {
    while(true){
    const mode = await select({
        message: "Choose CLI sub-mode ",
        options: [
            {
                value: "plan", label: "Plan Mode"
            },
            {
                value: "ask", label: "Ask Mode"
            },
            {
                value: "agent", label: "Agent Mode"
            }, {
                value: "back", label: "← Back to Main Menu"
            }
        ]
    })

    if (isCancel(mode) || mode === "back") {
        try { wakeup(); break;}
        catch (err) {
            console.log("Errro occured in the process of going to previous menu")
        }
    }
else if(mode === "agent"){
   await runAgentMode()
    break
}
else if(mode === "ask"){
   await runAskMode()
}
else if(mode === "plan"){
   await runPlanMode()
}else { 
    console.log(chalk.yellow("\nMode not Implemented Yet..\n"))
    return
}
    }

}