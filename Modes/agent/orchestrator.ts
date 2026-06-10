import { isCancel, text } from "@clack/prompts"
import chalk, { Chalk } from "chalk"
import { getAgentModel } from "../../AI/ai.config"
import { generateText } from "ai"
import { runCliMode } from "../cli"
import { defaultAgentConfig, type ActionLog } from "./types"
import { ActionTracker } from "./actionTracker"
import { ToolExecutor } from "./tool-executor"



export async function runAgentMode() {
  console.log(chalk.bold("\n 🤖 Running Agent Mode\n"))
  while (true) {
    const goal = await text({
      message: "What Would you like the agent to do for you ??",
      placeholder: "DO Some Concrete Database Task"
    })

    if (isCancel(goal) || !goal.trim()) {
      console.log(chalk.red("Please Enter Some Prompt For Our Agent IF No work then Kindly Quit"))
    }
    else if (goal && goal !== "\\quit") {

      const { text } = await generateText({
        model: getAgentModel(),
        prompt: goal,
      });

      console.log(
        chalk.cyan("🤖 Assistant") +
        "\n" +
        chalk.white(text)
      );
    }
    else if(goal == "\\quit"){
      runCliMode()
      break
    }
  }

  const config = defaultAgentConfig();
  const tracker = new ActionTracker()
  const executor  = new ToolExecutor(tracker,config)
const tools = createAgentTools(executor) 

}