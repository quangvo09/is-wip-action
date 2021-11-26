import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const {eventName} = github.context
    core.info(`Event name: ${eventName}`)

    if (eventName !== 'pull_request') {
      core.setOutput('is_wip', 'false')
      return
    }

    const title = github.context.payload.pull_request?.title
    const isCompleted = /\bready for pro\b/i.test(title)
    const isWip = !isCompleted
    core.setOutput('is_wip', isWip.toString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
