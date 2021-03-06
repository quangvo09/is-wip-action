import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const {eventName} = github.context
    core.info(`Event name: ${eventName}`)

    if (eventName !== 'pull_request') {
      core.setFailed(
        `Invalid event: ${eventName}, it should be use on pull_request`
      )
      return
    }

    const title = github.context.payload.pull_request?.title
    const isWip = /\bwip\b/i.test(title)
    core.setOutput('is_wip', isWip.toString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
