import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run() {
  try {
    const serviceId = core.getInput('service-id', { required: true })
    const accessToken = core.getInput('access-token', { required: true })

    core.info('Installing Zerops CLI...')
    await exec.exec('curl', [
      '-L',
      'https://github.com/zeropsio/zcli/releases/latest/download/zcli-linux-amd64',
      '-o',
      '/usr/local/bin/zcli'
    ])
    await exec.exec('chmod', ['+x', '/usr/local/bin/zcli'])

    core.exportVariable('ZEROPS_TOKEN', accessToken)

    core.info('Logging in with Zerops token...')
    await exec.exec(`zcli login ${accessToken}`)

    const deployCommand = `zcli push --serviceId ${serviceId}`
    core.info(`Executing: ${deployCommand}`)
    await exec.exec(deployCommand)

    core.info('Deployment completed successfully.')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with error: ${error.message}`)
    } else {
      core.setFailed('Action failed with an unknown error.')
    }
  }
}

run()
