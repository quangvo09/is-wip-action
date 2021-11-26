import * as core from '@actions/core'
const payload = require(process.env.GITHUB_EVENT_PATH);

async function run(): Promise<void> {
  try {
    const isWip = /\bwip\b/i.test(payload.pull_request.title);
    core.setOutput("is_wip", isWip.toString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
